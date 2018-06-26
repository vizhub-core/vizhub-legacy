# Create Visualization

Actor: Student, Teacher

A visualization is to be edited.

## Triggers

 * The create visualization flow will land a user on the edit page.
 * From the visualization view page, the user will be able to navigate to the edit page.

## Preconditions

 * The user is authenticated.
 * There exists a visualization to edit.
 * The user is the owner of the visualization to edit.

## Postconditions

Changes were made to the visualization.

Changes may include:

 * Modifying the text of existing files.
 * Creation and deletion of files.
 * Addition of code that loads a dataset.
 * Addition of code that loads a file from another visualization.
 * Editing the title of the visualization.
 * Editing the description of the visualization.

## Normal Course of Events

 * A user interface for editing visualization appears.
 * The user interacts with the editing interface to make the desired changes.
 * Changes are automatically saved, without the need to click "Save".
 * A notice that states "Saving..." should appear before changes are saved.
 * A notice that states "Saved." should appear after changes are saved.
 * After editing, the user will be able to navigate to the visualization view.

## Exceptional Case

 * If the user is not authenticated, the user should be presented with a working editor interface, but be given a warning that they must authenticate in order to save their work.
 * If the edit page is requested for a visualization that does not exist, the page should display a 404 not found page.
 * The user is not the owner of the visualization to edit, the user should be presented with a working editor interface, but be given a warning that they must fork this visualization in order to save their work.
