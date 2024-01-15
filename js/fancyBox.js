



Fancybox.bind("[data-fancybox]", {
  dragToClose: false,
  wheel: "slide",
  idle: false,
  infinite: false,
  backdropClick: false,
  Thumbs: false,
  Carousel: {
    Navigation: false,
  },
  Toolbar: {
    items: {
      prev: {
        tpl: '<button class="f-button" title="{{PREV}}" data-fancybox-prev><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path fill="#fff" d="M456.077-267.923 243.769-480.231l212.308-212.308 22 21.231L287-480.231l191.077 190.308-22 22Zm239.154 0L482.923-480.231l212.308-212.308 21.231 21.231-190.308 191.077 190.308 190.308-21.231 22Z"/></svg></button>',
      },
      infobar: {
        tpl: '<div class="unR60 fancybox__infobar" tabindex="-1"><span data-fancybox-current-index></span>/<span data-fancybox-count></span></div>',
      },
      next: {
        tpl: '<button class="f-button" title="{{NEXT}}" data-fancybox-next><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path fill="#fff" d="M434.077-480.231 243.769-671.308l22-21.231 212.308 212.308-212.308 212.308-22-22 190.308-190.308Zm239.154 0L482.923-671.308l21.231-21.231 212.308 212.308-212.308 212.308-21.231-22 190.308-190.308Z"/></svg></button>',
      },
      close: {
        tpl: '<button class="f-button" title="{{CLOSE}}" data-fancybox-close><svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path fill="#fff" d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg></button>',
      },
    },
    display: {
      left: [],
      middle: ["prev", "infobar", "next"],
      right: ["close"],
    },
  },

});