export function getRoomInfoFromLibCal(){
    return new Promise ((resolve, reject)=>{
        let accessToken,
            roomArray = [],
            numberOfRooms = -1;

        // get the access token
        fetch('https://api2.libcal.com/1.1/oauth/token',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                "client_id":"64",
                "client_secret":"bab9c43ebcc5c82242fc9942003eae52",
                "grant_type":"client_credentials",
            })
        })
        .then((res)=>res.json())
        .then((data)=>{
            // TODO: save access token in AsyncStorage for use later
            accessToken = data.access_token
            
            // get a list of active room ids
            let roomIDUrl = 'https://api2.libcal.com/1.1/rooms';

            fetch(roomIDUrl,{
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                    'Authorization': 'Bearer ' + accessToken
                }
            })
            .then((res)=>res.json())
            .then((data)=>{
                let rooms = data.rooms;
                numberOfRooms = rooms.length;
                
                // create url for each room_id, get timeslot data for that room
                for(let i=0;i<numberOfRooms;++i){
                    fetch('https://api2.libcal.com/1.1/room_availability/?room_id='+rooms[i].room_id, {
                        headers:{
                        'Accept':'application/json',
                        'Content-Type':'application/json',
                        'Authorization': 'Bearer ' + accessToken
                        }
                    })
                    .then((res)=>res.json())
                    .then((data)=>{
                        rooms[i].timeslots = data.availability.timeslots;
                        // using extra space to monitor when all async calls have completed
                        roomArray.push(rooms[i]);
                    }).catch((e)=>console.log(e));
                }
            });
        }).catch((e)=>console.log(e));

        // we need to check that all the async calls have completed before resolving the promise
        var checkComplete = setInterval(()=>{
            if(numberOfRooms == roomArray.length){
                clearInterval(checkComplete);
                return resolve(roomArray);
            }
        },100);
    });
}