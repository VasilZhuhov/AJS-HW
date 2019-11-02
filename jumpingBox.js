function jumpingJimmy(tower, jumpHeight) {
    let sum = 0;
    tower.some( el =>{
    if ( jumpHeight < el) {
        return true;
    }
    sum += el;
});
    return sum;
}
