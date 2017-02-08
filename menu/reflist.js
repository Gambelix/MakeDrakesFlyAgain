(function() {
  var app = angular.module('reflist', []);

  app.controller('SiteController', function(){
    this.sitelist=webpages;
  });

  var webpages = [
    { name: 'Drakelounge', earn: "$5.00", logo: 'https://www.drakelounge.com/dist/images/logo.png', desc : 'Bets', link: 'http://www.drakelounge.com/promocode/Gambelix/'},
    { name: 'Drakemoon', earn: "$0.45", logo: "https://www.drakemoon.com/build/dist/images/logo.svg", desc : 'Cases', link: 'https://www.drakemoon.com/promo-code/Gambelix' },
    { name: 'Drakewing', earn: "$1.00", logo: "https://www.drakewing.com/build/dist/images/logo.svg", desc : 'Roulette+', link: 'https://www.drakewing.com/promo-code/Gambelix' },
    { name: 'CSGO Roll', earn: "$0.50", logo:"http://csgoroll.com/assets/images/csgo_roll_large.png", desc:'Roulette+'},
    { name: 'CSGO Bounty', earn: '$0.50', logo: 'https://csgobounty.com/assets/img/logo-2x.png', desc:'Roulette+', link:'https://csgobounty.com/#/'},
    { name: 'CSGO Polygon', earn: '$0.50', logo: 'https://csgopolygon.com/img/logo.png', desc:'Bets+Roulette', link:'https://csgopolygon.com/'},
    { name: 'CSGOatse', earn: '$1.00', logo: 'https://csgoatse.com/img/logo-red.png', desc:'Roulette+', link:'https://csgoatse.com/'},
    { name: 'CSGO Live', earn: '$0.40', logo: 'https://www.csgolive.com/assets/images/logo.png', desc:'Cases', link:'https://www.csgolive.com'},
    { name: 'Society.GG', earn: '$0.50+', logo: 'https://society.gg/img/monkey.svg', desc:'Roulette+', link:'https://society.gg/#/bust?ref=Gambelix'},
    { name: 'CSGO Empire', earn: '$0.50', logo: 'https://csgoempire.com/assets/img/logo.png', desc:'Roulette', link:'https://csgoempire.com/'},
    { name: 'Bets.GG', earn: '$0.50+', logo: 'https://bets.gg/bets250.png', desc:'Roulette+', link:'https://bets.gg/'},
    { name: 'Skin Kings', earn: '$0.50', logo: 'http://skinkings.com/assets/img/logo-2x.png', desc:'Roulette+', link:'http://skinkings.com/#/'},
    { name: 'CSGO Aces', earn: '$0.50', logo: 'https://www.csgoaces.com/static/img/newLogo.png', desc:'Roulette+', link:'https://www.csgoaces.com/'},
    { name: 'Captain Skin', earn: '$0.50', logo: 'https://captainskin.com/assets/images/case/01.png', desc:'Cases', link:'https://captainskin.com/'},
    { name: 'CSGO Casino', earn: '$0.50', logo: 'http://flashyflashy.com/images/u2944.png?crc=278533668', desc:'Roulette+', link:'http://csgocasino.net/'},
    { name: 'Farm Skins', earn: '$1.00', logo: 'http://farmskins.com/content/images/logo.png?lastupdate=19-12-2016-13-58-11', desc:'Cases', link:'http://farmskins.com/ref-gambelix'},
    { name: 'Hellcase', earn: '$0.30', logo: 'https://hellcase.com/img/hslogony.png', desc:'Cases', link:'http://hellcase.com/fGambelix'},
    { name: 'CSGO500', earn: '$1.00', logo: 'https://www.csgo500.com/static/images/500logo.png', desc:'Roulette', link:'https://www.csgo500.com/'},
    { name: 'CSGO Arena', earn: '$0.50', logo: 'https://www.csgoarena.com/assets/183fa5ab9cd48694a4db3f3f68ba0982.png', desc:'Casino', link:'https://www.csgoarena.com/ref/201209'},
    { name: 'CSGO World', earn: '$0.50', logo: 'http://csgoworld.com/build/assets/img/logo.png', desc:'Roulette+', link:'https://www.csgoarena.com/'},
    { name: 'CSGO Big', earn: '$0.50', logo: 'https://csgobig.com/img/logo.png', desc:'Roulette+', link:'https://csgobig.com'},
    { name: 'Skinhub', earn: '$0.50', logo: 'https://skinhub.com/assets/images/static-logo.svg', desc:'Cases', link:'https://skinhub.com'},
    { name: 'CSGO Massive', earn: '$0.50', logo: 'https://csgomassive.com/Content/images/top-logo.png', desc:'XRCI2Q', link:'https://csgomassive.com/'},
    { name: 'CSGO Horseracing', earn: '$0.25', logo: 'http://csgohorseracing.com/img/logo.png', desc:'horse', link:'http://csgohorseracing.com/'}
  ];
})();