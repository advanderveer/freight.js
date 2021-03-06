var Freight = require('./../../src/freight.js');
var Definition = require('./../../src/definition.js');

/**
 * # Creating services
 */


describe('Basic Usage', function(){

    it('Build a Castle', function(){

      var Castle = function(knight, towers) {
        this.knight = knight;
        this.towers = towers;
      };

      var Tower = function(height) {
        this.height = height;
      };

      var Knight = function(name, sword, attributes) {
        this.name = name;
        this.sword = sword;
        this.attributes = attributes;
      };

      var Sword = function(name) {
        this.name = name;
        this.fastenGrip = function() {
          this.fastened = true;
        };

        this.sharpenBlade = function() {
          this.sharpened = true;
        };
      };

      var services = {
        "castle_fret": {
          "shared": true,
          "constructorFn": ":castle.class",
          "arguments": [":sir_freight", [":tower", ":tower", [":tower", ":tower"]]]
        },

        "sir_freight": {
          "shared": true,
          "constructorFn": ":knight.class",
          "arguments": ["Sir Freight", ":sword", {
            "strength": 40,
            "dexterity": 100,
            "quest": ":knight.quest",
            "tower": ":tower"
          }]
        },

        "sword": {
          "factoryFn": ":sword.factory"
        },

        "tower": {
          "constructorFn": ":tower.class",
          "arguments": [":tower.height"]
        }

      };

      var container = new Freight();      
      container.registerAll(services);

      container.setParameter('castle.class', Castle)
               .setParameter('tower.class', Tower)
               .setParameter('tower.height', 30)
               .setParameter('knight.class', Knight)
               .setParameter('knight.quest', 'Define all the dependencies!')
               .setParameter('sword.factory', function(){
                  var sword = new Sword('Excalibur');

                  sword.fastenGrip();
                  sword.sharpenBlade();
                  return sword;
               });

       var castle = container.get('castle_fret');

       castle.knight.name.should.equal('Sir Freight');
       castle.knight.attributes.dexterity.should.equal(100);

       castle.knight.sword.name.should.equal('Excalibur');
       castle.knight.sword.sharpened.should.equal(true);
       castle.knight.sword.fastened.should.equal(true);

       castle.towers[1].height.should.equal(30);


    });


});