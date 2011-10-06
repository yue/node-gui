#include "impl_main_gtk.h"
#include "node_gui_builder.h"
#include "node_gui_widget.h"

#define THROW_BAD_ARGS \
    ThrowException(Exception::TypeError(String::New("Bad argument")))

namespace clip {
Persistent<FunctionTemplate> Builder::constructor_template;

Builder::Builder (std::string filename) {
    MainLoop::push_job_gui (std::bind (&Builder::create, this, filename));
}

void Builder::Init (Handle<Object> target) {
    HandleScope scope;

    Local<FunctionTemplate> t = FunctionTemplate::New (New);
    constructor_template = Persistent<FunctionTemplate>::New(t);
    constructor_template->InstanceTemplate()->SetInternalFieldCount(1);
    constructor_template->SetClassName(String::NewSymbol("Builder"));

    NODE_SET_PROTOTYPE_METHOD (constructor_template, "destroy", Destroy);
    NODE_SET_PROTOTYPE_METHOD (constructor_template, "get", Get);
    target->Set (String::NewSymbol ("Builder"), t->GetFunction ());
}

Handle<Value> Builder::New (const Arguments& args) {
    HandleScope scope;

    // var builder = new Builder ('path/to/glade/file');
    if (args.Length () != 1 || !args[0]->IsString ()) {
        return THROW_BAD_ARGS;
    }

    Builder *builder = new Builder (*String::Utf8Value (args[0]));

    builder->Wrap (args.This ());
    builder->Ref ();
    return args.This ();
}

Handle<Value> Builder::Destroy (const Arguments& args) {
    HandleScope scope;

    Builder *self = ObjectWrap::Unwrap<Builder> (args.This());
    self->builder_.reset ();

    return Undefined ();
}

Handle<Value> Builder::Get (const Arguments& args) {
    HandleScope scope;

    // var widget = builder.get ('window_name');
    if (args.Length () != 1 || !args[0]->IsString ()) {
        return THROW_BAD_ARGS;
    }

    // Gtk::Builder::get_widget
    Builder *self = ObjectWrap::Unwrap<Builder> (args.This());
    Gtk::Widget *widget;
    self->builder_->get_widget (*String::Utf8Value (args[0]), widget);

    // var widget = new Widget ();
    Local<v8::Object> b = 
        Widget::constructor_template->GetFunction ()->NewInstance ();
    b->SetPointerInInternalField (0, widget);

    return scope.Close (b);
}

void Builder::create (std::string filename) {
    builder_ = Gtk::Builder::create_from_file (filename);
}
} /* clip */
