# PokeCLI

Welcome to **PokeCLI**! This is a terminal-based Pokémon application that provides information on Pokémon, their types, and abilities. PokeCLI uses colorful ASCII art to enhance your experience while fetching data from the Pokémon API. This project is entirely my work, and I welcome any feedback or suggestions for improvement.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Commands](#commands)
- [Dependencies](#dependencies)

## Overview

**PokeCLI** is a command-line interface that allows users to explore the world of Pokémon. It connects to the **PokéAPI** to provide up-to-date information on Pokémon, their types, and abilities. The application is designed to run in your terminal and features colorful ASCII art for a fun and interactive experience.

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
   git clone https://github.com/yourusername/PokeCLI.git
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

## Usage

Once you've started the app by running `npm start`, you can interact with the Pokémon world via the terminal. Here are some commands you can use:

- **help**: Displays a help menu with available commands.
- **type**: Prompts you to input a Pokémon type and provides information on its damage relations (e.g., weaknesses and resistances).
- **pokemon**: Prompts you to enter a Pokémon name to retrieve its stats, abilities, and types, along with an ASCII art sprite.
- **ability**: Prompts you to input a Pokémon ability name and displays its description and effects.
- **exit**: Exit the program.

### Examples:

1. **Get Pokémon Information**:
   Type `pokemon` and then enter a Pokémon name (e.g., `pikachu`). The app will display Pikachu’s stats, abilities, and types along with a colorful ASCII sprite.

2. **Get Type Information**:
   Type `type` and then enter a Pokémon type (e.g., `fire`). You will see how the Fire type interacts with other types (e.g., what it is strong or weak against).

3. **Learn about Abilities**:
   Type `ability` and then enter a Pokémon ability (e.g., `intimidate`). The app will display the ability’s effect and a brief description.

## Dependencies

- **PokéAPI**: Provides Pokémon data.
- **ascii-art**: For generating colorful ASCII art in the terminal.
- **chalk**: For adding colors to terminal outputs.
- **color-thief-node**: For extracting the dominant color from Pokémon sprites.
- **pokedex-promise-v2**: A wrapper for the PokéAPI to fetch data about Pokémon, types, and abilities.

