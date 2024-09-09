# PokeCLI

Welcome to **PokeCLI** – your personal Pokémon tool in the terminal! 🚀🌟 PokeCLI makes it super easy to get quick info on Pokémon, their types, and abilities. Whether you're battling with friends or need a fast way to check stats, this app solves that problem. Plus, with colorful ASCII art, it adds a bit of fun to your terminal experience!

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Commands](#commands)
- [Dependencies](#dependencies)

## Features

- **Pokémon Information**: Get detailed stats, abilities, types, and even a sprite of any Pokémon.
- **Type Information**: Learn about Pokémon types, including damage relations (like strengths and weaknesses).
- **Ability Information**: Discover the effects of various Pokémon abilities.
- **Colorful ASCII Art**: The app displays its title and some Pokémon sprites in colorful ASCII art.
- **Command-line interaction**: Users can type commands to retrieve Pokémon, types, and abilities information.

## Installation

### Step 1: Install Node.js

Make sure you have **Node.js** installed (version 18 or higher). You can download it from [Node.js official website](https://nodejs.org/).

### Step 2: Clone the Repository

1. Open your terminal or command prompt.
2. Clone this project by running the following command:
```bash
git clone https://github.com/ukpabik/PokeCLI.git
cd PokeCLI
```
2. **Install Dependencies**: Ensure you have Node v18 or higher. Check by running the command: node -v.
```bash
npm install
```
3. **Run the app**:
```bash
npm start
```
You will see the colorful PokeCLI title in your terminal, and you’ll be prompted to explore Pokémon data.

##Demo
[Demo](/pokecli-demo.mp4)

## Usage

Once you've started the app by running `npm start`, you can interact with the Pokémon world via the terminal. Here are some commands you can use:

- **help**: Displays a help menu with available commands.
- **typelist**: Displays a list of all available types.
- **type**: Prompts you to input a Pokémon type and provides information on its damage relations (e.g., weaknesses and resistances).
- **pokemon**: Prompts you to enter a Pokémon name to retrieve its stats, abilities, and types, along with an ASCII art sprite.
- **ability**: Prompts you to input a Pokémon ability name and displays its description and effects.
- **back**: Takes you back to the main menu.
- **exit**: Exit the program.

### Examples:

1. **Get Pokémon Information**:
   Type `pokemon` and then enter a Pokémon name (e.g., `pikachu`). The app will display Pikachu’s stats, abilities, and types along with a colorful ASCII sprite. Ex: pokemon -> pikachu -> all info on pikachu

2. **Get Type Information**:
   Type `type` and then enter a Pokémon type (e.g., `fire`). You will see how the Fire type interacts with other types (e.g., what it is strong or weak against). Ex: type -> fire -> all info on fire type

3. **Learn about Abilities**:
   Type `ability` and then enter a Pokémon ability (e.g., `intimidate`). The app will display the ability’s effect and a brief description. Ex: ability -> intimidate -> all info on intimidate ability

## Dependencies

- **PokéAPI**: Provides Pokémon data.
- **ascii-art**: For generating colorful ASCII art in the terminal.
- **chalk**: For adding colors to terminal outputs.
- **color-thief-node**: For extracting the dominant color from Pokémon sprites.
- **pokedex-promise-v2**: A wrapper for the PokéAPI to fetch data about Pokémon, types, and abilities.

