import React from "react";

function incrementStars() { }
function decrementStars() { }

export function Play({ stars }: { stars: string[] }) {
    const [starred, setStarred] = React.useState(false);

    const updateStar = () => {
        if (stars.find(o => o === 'aaa')) {
            setStarred(true); // doesn't change 'starred'
        }

        if (starred) {
            incrementStars();
        } else {
            decrementStars();
        }
    };

    return (
        <button onClick={updateStar}>Star or Destar</button>
    );
}

/*

- React renders Play
    - starred = false
- User clicks on star button
- React executes 'updateStar' event handler
- event handler updates state
    - setState: starred = true (next render)

- React re-renders Play
    - starred = true

*/