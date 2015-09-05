

var View = (function(){
    // private property
    var Handlebars = require("../vender/handlebars/handlebars.js").Handlebars;;

    Handlebars.compileFile = function (file) {
      file = file + ".hbs";
        //TODO: remove this overloaded argument
        var f = (typeof file === 'string') ? new File(file) : file;

        if (!Handlebars.cache) {
            Handlebars.cache = {};
        }

        if (Handlebars.cache[f.getPath()] != null) {
            return Handlebars.cache[f.getPath()];
        }

        f.open('r');
        var content = f.readAll().trim();
        f.close();
        var compiled = Handlebars.compile(content);
        Handlebars.cache[f.getPath()] = compiled;
        return compiled;
    };

    Handlebars.loadPartial = function (name) {
      var partial = Handlebars.partials[name];
      if (typeof partial === "string") {
        partial = Handlebars.compileFile(name);
        Handlebars.partials[name] = partial;
      }
      return partial;
    };

    Handlebars.registerHelper("block",
      function (name, options) {
        var partial
          = Handlebars.loadPartial(name) || options.fn;
        return partial(this, { data : options.hash });
    });

    Handlebars.registerHelper("partial",
      function (name, options) {
        if(Handlebars.partials[name])return;
        Handlebars.registerPartial(name, options.fn);
    });

    // public api
    return {

        render: function(template){          
          print(Handlebars.compileFile(template)());
        },

    };
})();