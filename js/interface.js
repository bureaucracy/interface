'use strict';

var Interface = function () {
  var views = document.querySelector('#views');
  var self = this;

  this.interval;
  this.backupList = localStorage.getItem('backups');
  this.data = JSON.parse(localStorage.getItem('saved')) || {};

  this.menu = {
    notes: function () {
      var notes = document.querySelector('#view-notes');
      notes.classList.add('active');
    },
    mail: function () {
      var email = document.querySelector('#view-mail');
      email.classList.add('active');
    }
  };

  this.views = {
    notes: function () {
      var notesEl = document.createElement('div');
      notesEl.id = 'view-notes';
      var textEl = document.createElement('textarea');
      notesEl.appendChild(textEl);
      textEl.addEventListener('input', function () {
        self.save('notes', textEl.value);
      });
      views.appendChild(notesEl);
    },
    mail: function () {
      var mailEl = document.createElement('div');
      mailEl.id = 'view-mail';
      views.appendChild(mailEl);
    }
  }
};

Interface.prototype = {
  init: function () {
    var info = document.querySelector('#info');
    var section = document.querySelector('#inner-content');

    if (!this.backupList) {
      info.textContent = 'you have no backups!';
    }

    for (var view in this.views) {
      this.views[view]();
    };

    for (var name in this.menu) {
      var p = document.createElement('p');
      p.classList.add('click');
      p.onclick = this.menu[name];
      p.textContent = name;
      section.appendChild(p);
    }

    this._autoSave();
  },

   _autoSave: function () {
    var self = this;
    this.interval = setInterval(function () {
      localStorage.setItem('saved', JSON.stringify(self.data));
      console.log(JSON.parse(localStorage.getItem('saved')));
    }, 5000);
    return this.interval;
  },

  save: function (type, value) {
    this.data[type] = value;
    clearInterval(this.interval);
    this._autoSave();
  }
};
