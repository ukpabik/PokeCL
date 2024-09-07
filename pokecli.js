import readline from 'node:readline';
import fs from 'node:fs';
import Pokedex from 'pokedex-promise-v2';
import art from 'ascii-art';
import chalk from 'chalk';
import { getColorFromURL } from 'color-thief-node';


//DISPLAY TITLE AT THE START
art.font('POKECLI', 'Standard', (err, rendered) => {
  if (err) {
    console.error('Error generating ASCII art:', err);
  } else {
    const lines = rendered.split('\n');
    lines.forEach(line => {
      const middle = Math.floor(line.length / 2);
      const firstHalf = line.slice(0, middle);  
      const secondHalf = line.slice(middle);
      
      
      console.log(chalk.redBright(firstHalf) + chalk.whiteBright(secondHalf));
    }) 
  }
  
  queryUser();
});





//USE POKEAPI FOR ALL DATA
const p = new Pokedex();



let helpMenu = '';
let typeList = [];

//FUNCTIONS FOR TEXT COLOR
const brightenColor = (color, factor) => {
  return color.map(value => Math.min(255, Math.floor(value * factor)));
};

// ADJUSTING COLOR
const getBrighterColor = (dominantColor) => {
  const brightness = getBrightness(dominantColor);
  const threshold = 128;  

  
  if (brightness < threshold) {
    const brightenedColor = brightenColor(dominantColor, 1.5);  
    return chalk.rgb(brightenedColor[0], brightenedColor[1], brightenedColor[2]);
  }

 
  return chalk.rgb(dominantColor[0], dominantColor[1], dominantColor[2]);
};


const getBrightness = (color) => {
  return (0.299 * color[0]) + (0.587 * color[1]) + (0.114 * color[2]);
};



//FETCHES LIST OF ALL TYPES USING HELPER METHOD FROM POKEAPI
const getTypeList = async () => {
  try {
    const response = await p.getTypesList();
    for (let i = 0; i < response.results.length; i++) {
      typeList.push(response.results[i].name);
    }
  } catch (err) {
    return console.log("Can't fetch type list: ", err);
  }
};


getTypeList().then(() => {
  queryUser();
});

//READS THE HELP MENU TEXT FILE
fs.readFile('options.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  else{
    helpMenu = data || 'Help menu is not available.';
  }
})


//CREATES INTERFACE FOR COMMAND LINE
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//TYPE QUESTION
const typeQuestion = async (prompt) => {
  rl.question(prompt, async (res) => {
    const ans = res.toLowerCase();
    if (ans === 'exit') {
      rl.close();
    } else if (ans === 'back') {
      queryUser();
    } else {
      try {
        // GET RESPONSE FOR TYPE NAME
        const response = await p.getTypeByName(ans);

        // FINDING FIRST VALID ICON FOR DOMINANT COLOR
        const findValidNameIcon = (sprites) => {
          return Object.values(sprites)
            .flatMap(generation => Object.values(generation))  // Flatten the object
            .find(icon => icon.name_icon !== null)?.name_icon; // Find the first valid name_icon
        };

        // FIND VALID URL
        const nameIconUrl = findValidNameIcon(response.sprites);

        if (!nameIconUrl) {
          console.log('No valid name_icon found.');
          typeQuestion(prompt);
          return;
        }

        // GET DOMINANT COLOR FROM SPRITE ICON
        const dominantColor = await getColorFromURL(nameIconUrl);

        // USE CHALK RGB TO GET THE COLOR
        const titleColor = getBrighterColor(dominantColor);

        const damageData = response.damage_relations;
        const damageInfo = {
          doubleFrom: '| ',
          doubleTo: '| ',
          halfFrom: '| ',
          halfTo: '| ',
          noFrom: '| ',
          noTo: '| '
        };

        const damageMapping = {
          double_damage_from: 'doubleFrom',
          double_damage_to: 'doubleTo',
          half_damage_from: 'halfFrom',
          half_damage_to: 'halfTo',
          no_damage_from: 'noFrom',
          no_damage_to: 'noTo'
        };

        // GET ALL DAMAGE INFO
        Object.keys(damageMapping).forEach((key) => {
          damageData[key].forEach((type) => {
            damageInfo[damageMapping[key]] += type.name + ' | ';
          });
        });

        // OUTPUT ALL INFO WITH DOMINANT COLOR
        console.log(titleColor(`\n=== ${ans.toUpperCase()} Type Damage Info ===\n`));
        console.log(titleColor('Double damage from: ' + damageInfo.doubleFrom + '\n'));
        console.log(titleColor('Double damage to: ' + damageInfo.doubleTo + '\n'));
        console.log(titleColor('Half damage from: ' + damageInfo.halfFrom + '\n'));
        console.log(titleColor('Half damage to: ' + damageInfo.halfTo + '\n'));
        console.log(titleColor('No damage from: ' + damageInfo.noFrom + '\n'));
        console.log(titleColor('No damage to: ' + damageInfo.noTo + '\n'));

        // REPROMPT
        typeQuestion(prompt);
      } catch (err) {
        console.error('Invalid type:', err);
        typeQuestion(prompt);
      }
    }
  });
};

//POKEMON QUESTION
const pokeQuestion = async (prompt) => {
  rl.question(prompt, async (res) => {
    const ans = res.toLowerCase();
    if (ans === 'exit') {
      rl.close();
    } else if (ans === 'back') {
      queryUser();
    } else {
      try {
        const response = await p.getPokemonByName(ans);
        
        const info = [{
          name: response.name.toUpperCase(),
          abilities: [],
          pokeTypes: [],
          pokeStats: [],
          weight: response.weight
        }];

        response.abilities.forEach((ability) => {
          info[0].abilities.push(ability.ability.name);
        });

        response.types.forEach((type) => {
          info[0].pokeTypes.push(type.type.name);
        });

        response.stats.forEach((stat) => {
          info[0].pokeStats.push({
            name: stat.stat.name,
            base: stat.base_stat
          });
        });

        const pokeSprite = response.sprites.front_default;

        // GET THE DOMINANT COLOR FROM THE SPRITE IMAGE
        const dominantColor = await getColorFromURL(pokeSprite);
        //PASS IT TO THE CHALK RGB
        const titleColor = getBrighterColor(dominantColor);
        


        //PRINT ASCII IMAGE OF POKESPRITE
        art.image({
          filepath: pokeSprite,
          width: 100,
          alphabet: 'greyscale'
        }).then(rendered => {
          console.log(rendered);
          
          // PRINT THE NAME OF POKEMON WITH DOMINANT COLOR
          console.log(titleColor.visible(`\n=== ${info[0].name} ===\n`));
          console.log(chalk.green(`Weight: ${info[0].weight} lbs\n`));
          
          console.log(chalk.yellow('Abilities:'));
          info[0].abilities.forEach((ability) => {
            console.log(chalk.cyan(`- ${ability}`));
          });

          console.log(chalk.yellow('\nTypes:'));
          info[0].pokeTypes.forEach((type) => {
            console.log(chalk.magenta(`- ${type}`));
          });

          console.log(chalk.yellow('\nStats:'));
          info[0].pokeStats.forEach((stat) => {
            console.log(chalk.red(`${stat.name}: ${stat.base}`));
          });

          pokeQuestion(prompt);
        }).catch(err => {
          console.error('Could not render sprite.');
          art.font(info[0].name, 'Doom', function(rendered){
            console.log(chalk.blue.bold(rendered));
            pokeQuestion(prompt);
          });
        });
      } catch (err) {
        console.error('Invalid Pokémon or issue fetching data:', err);
        pokeQuestion(prompt);
      }
    }
  });
};


//ABILITY QUESTION
const abilityQuestion = (prompt) => {
  rl.question(prompt, (res) => {
    const ans = res.toLowerCase()
    if (ans === 'exit'){
      rl.close()
    }
    else if (ans === 'back'){
      queryUser();
    }
    else{
      p.getAbilityByName(ans).then(response => {
        const info = {
          name: response.name.toUpperCase(),
          description: response.effect_entries
            .filter((entry) => entry.language.name === 'en')[0]
            .effect.replace(/\n/g, ' ')
        };
      
        console.log('\n=== Ability Info ===');
        console.log(`\nName: ${info.name}\n`);
        console.log(`Description: ${info.description}\n`);
      
        abilityQuestion(prompt);
      }).catch((err) => {
        console.error('Invalid ability');
        abilityQuestion(prompt);
      });
    }
    
  })
}





//SPECIFIC PROMPT QUESTIONS
const question = (query) => {
  let prompt = `What ${query} would you like to learn about? `;
  switch (query){
    case 'type':
      typeQuestion(prompt)
      break;
    case 'ability':
      abilityQuestion(prompt)
      break;
    case 'pokemon':
      pokeQuestion(prompt)
      break;
    

  }
}




// ASKS THE INITIAL QUESTION (MAINLY FOR PRINTING LISTS OR HELP)
const queryUser = () => {
  rl.question('What would you like to know about the World of Pokemon? (Type help for more info): ', res => {
    if (res.toLowerCase() === 'exit'){
      console.log('Goodbye!')
      rl.close()
    }
    else{ 
      switch(res.toLowerCase()){
        case 'help':
          console.log(helpMenu)
          break;
        case 'type':
          question('type')
          break;
        case 'typelist':
          console.log(typeList)
          break;
        case 'pokemon':
          question('pokemon')
          break;
        case 'ability':
          question('ability')
          break;
        
      }
      queryUser();
    }
    
  })
}






