
import { exitCode } from 'node:process';
import readline from 'node:readline'
import fs from 'node:fs'
import Pokedex from 'pokedex-promise-v2'
import art from 'ascii-art'



//USE POKEAPI FOR ALL DATA
const p = new Pokedex();



let helpMenu = '';
let typeList = [];





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

const typeQuestion = (prompt) => {
  rl.question(prompt, (res) => {
    const ans = res.toLowerCase()
    if (ans === 'exit'){
      rl.close()
    }
    else if (ans === 'back'){
      queryUser();
    }
    else{
      p.getTypeByName(ans).then(response => {
        const damageData = response.damage_relations;
        const start = '| ';
        const damageInfo = {
          doubleFrom: start,
          doubleTo: start,
          halfFrom: start,
          halfTo: start,
          noFrom: start,
          noTo: start
        }
  
        const damageMapping = {
          double_damage_from: 'doubleFrom',
          double_damage_to: 'doubleTo',
          half_damage_from: 'halfFrom',
          half_damage_to: 'halfTo',
          no_damage_from: 'noFrom',
          no_damage_to: 'noTo'
        };
  
        Object.keys(damageMapping).forEach((key) => {
          damageData[key].forEach((type) => {
            damageInfo[damageMapping[key]] += type.name + ' | ';
          });
        });
  
        
        console.log('\nDouble damage from: ' + damageInfo.doubleFrom + '\n');
        console.log('Double damage to: ' + damageInfo.doubleTo + '\n');
        console.log('Half damage from: ' + damageInfo.halfFrom + '\n');
        console.log('Half damage to: ' + damageInfo.halfTo + '\n');
        console.log('No damage from: ' + damageInfo.noFrom + '\n');
        console.log('No damage to: ' + damageInfo.noTo + '\n');
  
        typeQuestion(prompt)
  
      }).catch((err) => {
        console.error('Invalid type')
        typeQuestion(prompt)
      })
    }
    
    
  })
}

const pokeQuestion = (prompt) => {
  rl.question(prompt, (res) => {
    const ans = res.toLowerCase()
    if (ans === 'exit'){
      rl.close()
    }
    else if (ans === 'back'){
      queryUser();
    }
    else{
      p.getPokemonByName(ans).then(response => {


        //TODO: LOGIC FOR GETTING POKEMON
        //INCLUDE TYPES, BASE STATS, NAME, VERSIONS, WEIGHT, MOVES** (maybe)
        const info = [{
          name: response.name,
          abilities: [],
          pokeTypes: [],
          pokeStats: [],
          weight: response.weight,
          pokeSprite: response.sprites.front_default
        }]

        response.abilities.forEach((ability) => {
          info[0].abilities.push(ability.ability.name)
        })

        response.types.forEach((type) => {
          info[0].pokeTypes.push(type.type.name)
        })

        response.stats.forEach((stat) => {
          info[0].pokeStats.push({
            name: stat.stat.name,
            base: stat.base_stat
          })
        })

        

        //DISPLAYING SPRITE WITH ASCII
        art.image({
          filepath: info[0].pokeSprite,
          width: 100,
          alphabet: 'hatching'
        }).then(rendered => {
          console.log(rendered);
          info.forEach((element) => {
            console.log(element);
          });
          pokeQuestion(prompt);
        }).catch(err => {
          console.error('Could not render sprite.');
          art.font(info[0].name, 'Doom', function(rendered){
            console.log(rendered);
            pokeQuestion(prompt);
          });
        });

        
      }).catch((err) => {
        console.error('Invalid pokemon')
        pokeQuestion(prompt)
      })
    }
  })
}

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
          name: `${response.name}`,
          description: `${response.effect_entries
          .filter((entry) => entry.language.name === 'en')[0].effect
          .replace(/\n/g, ' ')}`

        }
        
        
        for (const element in info){
          console.log(`\n${element}: ${info[element]}`)
        }
        console.log('\n')

        
        abilityQuestion(prompt)
      }).catch((err) => {
        console.error('Invalid ability')
        abilityQuestion(prompt)
      })
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






