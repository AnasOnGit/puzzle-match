export function shuffleArray(array) {
    // Get the length of the array
    let length = array.length;

    // Loop through the array, from the end
    for (let i = length - 1; i >= 0; i--) {
        // Get a random index between 0 and i
        let randomIndex = Math.floor(Math.random() * (length - i));

        // Swap the element at the current index with the element at the random index,
        // as long as the elements are not adjacent.
        while (randomIndex >= i + 1) {
            randomIndex = Math.floor(Math.random() * (length - i));
        }

        let temp = array[i];
        array[i] = array[randomIndex];
        array[randomIndex] = temp;
    }

    return array;
}