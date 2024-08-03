const clickMe = () => {
    alert("Thanks for clicking me. Hope you have a nice day!");
}

$(document).ready(() => {
    $('#clickMeButton').click(() => {
        clickMe();
    });

    $('#rightButton').click(() => {
        console.log('Right Button Clicked!');
        $.ajax({
            url: 'http://localhost:3040/addTwoNumber',
            type: 'GET',
            success: (data) => {
                $('#info').text("result of adding two number is: " + data.data);
            },
            error: (err) => {
                console.error(err);
            }
        });
    });
});

