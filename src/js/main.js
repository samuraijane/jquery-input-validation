(function($) {

	let app = {

    dictionary: {
      "~": {
      	allowed: ["password"],
        escape: null,
        htmlEntity: "&#126;",
        name: "tilde",
        replaceWith: ''
      },
      "&": {
        allowed: ["password"],
        escape: null,
        htmlEntity: "&amp;",
        name: "ampersand",
        replaceWith: ''
      },
      "<": {
        allowed: null,
        escape: null,
        htmlEntity: "&lt;",
        name: "less than",
        replaceWith: ''
      },
      ">": {
        allowed: null,
        escape: null,
        htmlEntity: "&gt;",
        name: "greater than",
        replaceWith: ''
      },
      '"': {
        allowed: ["password"],
        escape: null,
        htmlEntity: '&quot;',
        name: "double quotes straight",
        replaceWith: ''
      },
      "'": {
        allowed: ["password"],
        escape: null,
        htmlEntity: '&apos;',
        name: "single quote straight",
        replaceWith: ''
      },
      "`": {
        allowed: ["password"],
        escape: null,
        htmlEntity: "&grave;",
        name: "grave accent",
        replaceWith: ''
      },
      ",": {
        allowed: ["password"],
        escape: null,
        htmlEntity: "&comma;",
        name: "comma",
        replaceWith: ''
      },
      "!": {
        allowed: ["password"],
        escape: null,
        htmlEntity: "&excl;",
        name: "exclamation point",
        replaceWith: ''
      },
      "@": {
        allowed: ["password", "username"],
        escape: null,
        htmlEntity: "&#64;",
        name: "at sign",
        replaceWith: ''
      },
      "$": {
        allowed: ["password"],
        escape: null,
        htmlEntity: "&dollar;",
        name: "dollar sign",
        replaceWith: ''
      },
      "%": {
        allowed: ["password"],
        escape: null,
        htmlEntity: "&percnt;",
        name: "percent sign",
        replaceWith: ''
      },
      "(": {
        allowed: ["password"],
        escape: null,
        htmlEntity: "&lpar;",
        name: "left parenthesis",
        replaceWith: ''
      },
      ")": {
        allowed: ["password"],
        escape: null,
        htmlEntity: "&rpar;",
        name: "right parenthesis",
        replaceWith: ''
      },
      "=": {
        allowed: ["password"],
        escape: null,
        htmlEntity: "&equals;",
        name: "equals sign",
        replaceWith: ''
      },
      "+": {
        allowed: ["password"],
        escape: null,
        htmlEntity: "&plus;",
        name: "plus sign",
        replaceWith: ''
      },
      "{": {
        allowed: ["password"],
        escape: null,
        htmlEntity: "&lcub;",
        name: "left curly brace",
        replaceWith: ''
      },
      "}": {
        allowed: ["password"],
        escape: null,
        htmlEntity: "&rcub;",
        name: "right curly brace",
        replaceWith: ''
      },
      "[": {
        allowed: ["password"],
        escape: "\\",
        htmlEntity: "&lsqb;",
        name: "left square bracket",
        replaceWith: ''
      },
      "]": {
        allowed: ["password"],
        escape: "\\",
        htmlEntity: "&rsqb;",
        name: "right square bracket",
        replaceWith: ''
      },
      "/": {
        allowed: ["password"],
        escape: "\\",
        htmlEntity: "&#x2F;",
        name: "forward slash",
        replaceWith: ''
      },
      "\\": {
        allowed: ["password"],
        escape: "\\",
        htmlEntity:  "&#92;",
        name: "backward slash",
        replaceWith: ''
      },
      "?": {
        allowed: ["password"],
        escape: null,
        htmlEntity: "&quest;",
        name: "question mark",
        replaceWith: ''
      },
      "#": {
        allowed: ["password"],
        escape: null,
        htmlEntity: "&num;",
        name: "pound sign",
        replaceWith: ''
      },
      "*": {
        allowed: ["password"],
        escape: null,
        htmlEntity: "&ast;",
        name: "asterisk",
        replaceWith: ''
      },
      "^": {
        allowed: ["password"],
        escape: null,
        htmlEntity: "&Hat;",
        name: "hat",
        replaceWith: ''
      },
      ":": {
        allowed: ["password"],
        escape: null,
        htmlEntity: "&colon;",
        name: "colon",
        replaceWith: ''
      },
      ";": {
        allowed: ["password"],
        escape: null,
        htmlEntity: "&semi;",
        name: "semicolon",
        replaceWith: ''
      },
      ".": {
        allowed: ["password", "username"],
        escape: null,
        htmlEntity: "&#46;",
        name: "period",
        replaceWith: ''
      },
      "-": {
        allowed: ["password", "username"],
        escape: "\\\\",
        htmlEntity: "&#8722;",
        name: "minus",
        replaceWith: ''
      },
      "_": {
        allowed: ["password"],
        escape: null,
        htmlEntity: "&#95;",
        name: "underscore",
        replaceWith: ''
      },
      "|": {
        allowed: ["password"],
        escape: null,
        htmlEntity: "&#124;",
        name: "pipe",
        replaceWith: ''
      }
    },

    doCategorize: function() {
      for (let key in app.dictionary) {
				//sort password chars
        if(app.dictionary[key].allowed && app.dictionary[key].allowed.indexOf("password") > -1 && app.dictionary[key].escape) {
          let _char = app.dictionary[key].escape + key;
          app.passwordChars.allowed.push(_char);
        } else if(app.dictionary[key].allowed && app.dictionary[key].allowed.indexOf("password") > -1 && !app.dictionary[key].escape) {
          app.passwordChars.allowed.push(key);
        } else if(!app.dictionary[key].allowed || app.dictionary[key].allowed.indexOf("password") < 0) {
        	app.passwordChars.prohibited.push(key);
        }
				//sort username chars
        if (app.dictionary[key].allowed && app.dictionary[key].allowed.indexOf("username") > -1 && app.dictionary[key].escape) {
          let _char = app.dictionary[key].escape + key;
          app.usernameChars.allowed.push(_char);
        } else if (app.dictionary[key].allowed && app.dictionary[key].allowed.indexOf("username") > -1 && !app.dictionary[key].escape) {
          app.usernameChars.allowed.push(key);
        } else if(!app.dictionary[key].allowed || app.dictionary[key].allowed.indexOf("username") < 0) {
        	app.usernameChars.prohibited.push(key);
        }
				//group all illegal chars
				if (app.dictionary[key].escape) {
					let _char = `${app.dictionary[key].escape}${key}`;
					app.illegalChars.list.push(_char);
				} else {
					app.illegalChars.list.push(key);
				}
      }
    },

		emptyFields() {
			$('input').val('');
			$('.dynamic').empty();
		},

    handleLogin: function() {  //c001
    	$(document).on('click', '#t-login', function() {
				let usernameDirty = $('#usernameInput').val();
        let passwordDirty = $('#passwordInput').val();
        return app.sanitize(usernameDirty, passwordDirty);
      });
    },

		illegalChars: {
			getChars: function() {  //c003
				let _promise = new Promise((res, rej) => {
					let _chars = this.list.join("").replace(/^/, "\[").replace(/$/, "\]");
					console.log(_chars);
					res(_chars);
					//TODO catch the error
				});
				return _promise;
			},
			list: []
		},

  	init: function() {
      app.doCategorize();
      app.handleLogin();
			app.handleReset();
    },

    isValidEmail: function(email) {  //c005
    	let _promise = new Promise((res, rej) => {
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        res(re.test(email));
				//TODO catch the error
      });
      return _promise;
    },

    passwordChars: {
    	allowed: [],
      prohibited: []
    },

		handleReset: function() {
			$(document).on('click', '#t-reset', function() {
				$('.messages').removeClass('active');
				setTimeout(function() {
					app.emptyFields();
				}, 1000)
			});
		},

    sanitize: function(usernameDirty, passwordDirty) {
			app.sanitizePassword(passwordDirty);
			app.sanitizeUsername(usernameDirty);
    },

    sanitizePassword: function(passwordDirty) {
    	let _allowed = [];
      let _dictionary = _.cloneDeep(app.dictionary);
      app.passwordChars.prohibited.map((item, index) => {
        $('#t-passwordCharsRemoved').append(`
          <li><span>${item}</span></li>
        `);
      });
      app.passwordChars.allowed.map((item, index) => {
				let _item = item[item.length - 1];
        if(Object.keys(_dictionary).indexOf(_item) > -1) {
        	_allowed.push(_item);
          _dictionary[_item].replaceWith = _dictionary[_item].htmlEntity;
        }
      });
			app.illegalChars.getChars().then(res => {
				let re = new RegExp(res, "g");
				let sanitizedPassword = String(passwordDirty)
				.replace(re, function(s) {
					return _dictionary[s].replaceWith;
				});
				_allowed.map((item, index) => {
					app.showUnencodedEntity(_dictionary[item].htmlEntity)
						.then(
							res => {
								$('#t-passwordCharsReplaced').append(`
									<li><span>${item}</span><pre>${res}</pre></li>
								`);
								$('.messages').addClass('active');
							}
						);
				});
				app.removeWhitespace(sanitizedPassword).then(res => {
					$('#t-outputpassword').empty().append(res);
				});
			});
    },

    sanitizeUsername: function(usernameDirty) {
      let _allowed = [];
      let _dictionary = _.cloneDeep(app.dictionary);
      app.usernameChars.prohibited.map((item, index) => {
        $('#t-usernameCharsRemoved').append(`
          <li><span>${item}</span></li>
        `);
      });
      app.usernameChars.allowed.map((item, index) => {
				let _item = item[item.length - 1];
        if(Object.keys(_dictionary).indexOf(_item) > -1) {
        	_allowed.push(_item);
          _dictionary[_item].replaceWith = item;  //c004
        }
      });
			app.illegalChars.getChars().then(res => {
	      let re = new RegExp(res, "g");
	      let sanitizedUsername = String(usernameDirty)
	      .replace(re, function(s) {
	          return _dictionary[s].replaceWith;
	      });
	      _allowed.map((item, index) => {
	      	app.showUnencodedEntity(_dictionary[item].htmlEntity)
	        	.then(
	            res => {
	              $('#t-usernameCharsReplaced').append(`
	                <li><span>${item}</span><pre>${res}</pre></li>
	              `);
	              $('.messages').addClass('active');
	            }
	          );
	      });
	      app.isValidEmail(sanitizedUsername).then(res => {
	      	console.log('EMAIL VALID ', res);
	      });
	      app.removeWhitespace(sanitizedUsername).then(res => {
	        $('#t-outputuser').empty().append(res);
	      });
			});
    },

    showUnencodedEntity: function(raw) {  //c002
    	let promise = new Promise((res, rej) => {
        raw.replace(/[\u00A0-\u9999<>\&]/g, function(i) {
          res(raw.replace(/&/g, '&amp;'));
        });
        //TODO catch the error
      });
      return promise;
    },

    removeWhitespace: function(str) {
    	let _promise = new Promise((res, rej) => {
      	let re = new RegExp("\\s", "g");
        res(str.replace(re, ''));
				//TODO catch the error
      });
      return _promise;
    },

    usernameChars: {
      allowed: [],
      prohibited: []
    }

  };

  $(document).ready(function() {
  	app.init();
  })

})(window.jQuery);
