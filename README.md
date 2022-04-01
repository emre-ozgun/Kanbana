#### Requirements unfulfilled
1. Adding & removing duedate. (in card modal route)
2. Adding & removing checklist and checklist items. (in card moda route)
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






