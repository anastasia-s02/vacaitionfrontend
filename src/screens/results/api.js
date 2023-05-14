import '../../assets/css/results.css';

export const getResults = async (prompt) => {
    // let myList = [{"u_id": 1, "plan": {"name of destination1": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus enim non velit faucibus, ac pharetra massa mattis. Nam vel orci ac sem aliquet pulvinar. Integer commodo purus ut dui ullamcorper, vitae fermentum augue feugiat. Fusce ultricies lacus quis leo pulvinar, eu consequat tellus consectetur. Donec ullamcorper eget felis vel dictum. Aenean id risus in nisl volutpat efficitur. Nam auctor felis sed enim blandit, at fringilla ex blandit. Praesent convallis, eros eu bibendum faucibus, libero ex mollis ipsum, vitae tincidunt mi eros ut velit."}}, 
    //             {"u_id": 2, "plan": {"name of destination2": "Sed sed congue nunc. Donec ut nisl vel mauris vehicula gravida. Sed ac augue eu nibh lobortis consequat ut nec ipsum. Sed ut quam eget ipsum aliquam sagittis eget eu velit. Aliquam erat volutpat. Etiam nec massa felis. Fusce nec euismod odio. Sed vel ipsum ac orci pellentesque sollicitudin."}}, 
    //             {"u_id": 3, "plan": {"name of destination3": "Nullam eget lectus nisi. Vivamus vel risus quis elit semper pretium. Donec id risus in nisi interdum eleifend. Morbi blandit ullamcorper quam a vestibulum. Nam vel laoreet quam. Aliquam euismod augue ac mi placerat, at semper mauris eleifend. Aliquam aliquam sodales elit, vitae ultricies quam faucibus quis. Vestibulum sit amet consequat nibh. Sed sed ipsum quis nisi congue laoreet. Vivamus eu convallis metus, a auctor enim. Cras bibendum consectetur mi ac venenatis. Aenean in nunc libero. Sed quis lorem enim."}}];

    let myList = {"u_id": 1, "plan": {"name of destination1": "its description", "name of destination2": "its description", "name of destination3": "its description"} , "user_details": "user_details"};

    const destinationList = Object.keys(myList.plan).map((destination) => ({
        name: destination,
        description: myList.plan[destination]
    }));

    myList.plan = destinationList;

    console.log(destinationList);
    console.log(myList.plan);

    return myList;
}