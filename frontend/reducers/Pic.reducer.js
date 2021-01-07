export default function(photo = [], action) {
  
    if(action.type == 'increase') {

        var newPhotoList =[...photo];
        newPhotoList.push(action.photoUrl)
        // console.log("---------------reducer newPhoto-------------",newPhotoList)
        return newPhotoList;
    }    
    else if(action.type == 'decrease'){
        photo = []
        // console.log("---------------reducer photo-------------",photo)
        return photo;
    }else {    
        return photo; 
    } 
}
