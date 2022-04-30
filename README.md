## Instructions to spin up the server
1. navigate to server-side
2. <code>npm install</code>
3. <code>docker-compose up --build</code>

## Client-side
1. <code>npm install && npm start</code>




#### Requirements unfulfilled
1. Adding & removing duedate. (in card modal)
2. Adding & removing checklist and checklist items. (in card modal)
3. Dragging/dropping lists themselves.


#### Issues
1. Deleting kanban board (or leaving from board if the user is a member) may not seemlessly update the board list after navigating.
2. Inserting card at another list causes data loss, meaning that only title of the card is passed onto target list. (Though UI persists despite data loss)


#### Authentication
* JWT Auth utilizing local storage.

#### Global State Management
* Redux toolkit with async thunks.

#### Styling
* Vanilla CSS.

## Screens

<img width="1515" alt="Screenshot 2022-04-06 at 15 28 26" src="https://user-images.githubusercontent.com/50968552/161975778-cf3afb29-5e81-43f7-a5e9-b10dee67704e.png">


<img width="1512" alt="Screenshot 2022-04-06 at 15 16 36" src="https://user-images.githubusercontent.com/50968552/161975833-7c9a7bd9-14cb-427b-93f0-d6516f76d13b.png">


<img width="1513" alt="Screenshot 2022-04-06 at 15 15 34" src="https://user-images.githubusercontent.com/50968552/161975859-5b4d6e86-598f-470a-b5c1-d381d6f65a4b.png">


![drag-drop](https://user-images.githubusercontent.com/50968552/161975910-726872dd-4b02-4458-bc3e-569a690ea303.gif)
