# Create Visualization

Actor: Student, Teacher

A new visualization is to be created.

## Triggers

Access the user interface element for creating a new visualization.

## Preconditions

The user is authenticated.

## Postconditions

A new visualization was created, with the title specified by the user.

## Normal Course of Events

 * A user interface for creating a new visualization appears.
 * The user specifies the desired title for the visualization.
 * The user confirms that the visualization should be created.
 * The user is informed that the visualization was created.
 * The user is presented with the visualization editor interface.

## Alternative Courses of Events

### Missing Title

 * If the user confirms that the visualization should be created but has not entered a title, then an error should appear indicating that the title field is required.

### Choose a Template

 * The user may chooses a template to start from.
 * In this case, the template visualization will be "forked".
