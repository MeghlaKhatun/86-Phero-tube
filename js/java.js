const handleCategory= async ()=>{
    const response=await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data =await response.json();
    // console.log(data)
    const categoryList=document.getElementById("category-list");

    data.data.forEach((element) => {
        // handleNews(element.category_id);
        const div=document.createElement("div");
        div.innerHTML=`
        <button onclick=" handleNews('${element.category_id}')" class="py-[5px] px-[20px] text-[18px] font-semibold rounded-[4px] bg-[#25252526] text-[#252525B2] hover:bg-[#FF1F3D] hover:text-white">${element.category} </button>
        `;
        categoryList.appendChild(div)
    });
    
}



const handleNews= async (id) =>{
    const response=await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await response.json();
    // console.log(data.data);

    getNoContent(data.data);



    
   
    const cardContainer=document.getElementById("card-container");
    cardContainer.textContent="";

    data.data?.forEach((element) => {

        // console.log(element)
        const div=document.createElement("div");

        div.dataset .views = parseInt(element.others.views);

        div.innerHTML=`
        <div class="card card-compact h-[350px]  bg-base-100 shadow-xl">

        
        <figure> <img class="w-full h-[200px]" src=${element.thumbnail} /></figure>
        ${element.others.posted_date ? getTime(element.others.posted_date) : ""}
        
                <div class="flex p-5">

                <div>
                <img class="w-[40px] h-[40px] mt-4 rounded-full" src=${element.authors[0]?.profile_picture} alt="">
            </div>

                    <div class="card-body">
                        <h2 class="card-title text-[16px] text-[#171717] font-bold">${element.title}</h2>
                        <div class="flex">
                        <p class="text-sm text-[#171717B2] font-normal">${element.authors[0].profile_name}</p>
                        <p class="text-sm text-[#171717B2] font-normal">${element.authors[0].verified ? `
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <g clip-path="url(#clip0_11_245)">
                        <path d="M19.375 10.0001C19.375 10.8001 18.3922 11.4595 18.1953 12.197C17.9922 12.9595 18.5063 14.022 18.1203 14.6892C17.7281 15.3673 16.5484 15.4486 15.9984 15.9986C15.4484 16.5486 15.3672 17.7282 14.6891 18.1204C14.0219 18.5064 12.9594 17.9923 12.1969 18.1954C11.4594 18.3923 10.8 19.3751 10 19.3751C9.2 19.3751 8.54062 18.3923 7.80312 18.1954C7.04062 17.9923 5.97813 18.5064 5.31094 18.1204C4.63281 17.7282 4.55156 16.5486 4.00156 15.9986C3.45156 15.4486 2.27187 15.3673 1.87969 14.6892C1.49375 14.022 2.00781 12.9595 1.80469 12.197C1.60781 11.4595 0.625 10.8001 0.625 10.0001C0.625 9.20012 1.60781 8.54075 1.80469 7.80325C2.00781 7.04075 1.49375 5.97825 1.87969 5.31106C2.27187 4.63293 3.45156 4.55168 4.00156 4.00168C4.55156 3.45168 4.63281 2.272 5.31094 1.87981C5.97813 1.49387 7.04062 2.00793 7.80312 1.80481C8.54062 1.60793 9.2 0.625122 10 0.625122C10.8 0.625122 11.4594 1.60793 12.1969 1.80481C12.9594 2.00793 14.0219 1.49387 14.6891 1.87981C15.3672 2.272 15.4484 3.45168 15.9984 4.00168C16.5484 4.55168 17.7281 4.63293 18.1203 5.31106C18.5063 5.97825 17.9922 7.04075 18.1953 7.80325C18.3922 8.54075 19.375 9.20012 19.375 10.0001Z" fill="#2568EF"/>
                        <path d="M12.7094 7.20637L9.14065 10.7751L7.29065 8.92668C6.88909 8.52512 6.23752 8.52512 5.83596 8.92668C5.4344 9.32824 5.4344 9.97981 5.83596 10.3814L8.43127 12.9767C8.8219 13.3673 9.45627 13.3673 9.8469 12.9767L14.1625 8.66106C14.5641 8.25949 14.5641 7.60793 14.1625 7.20637C13.761 6.80481 13.111 6.80481 12.7094 7.20637Z" fill="#FFFCEE"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_11_245">
                        <rect width="20" height="20" fill="white"/>
                        </clipPath>
                        </defs>
                        </svg>
                        ` : ''}</p>
                        </div>
                        <p class="text-sm text-[#171717B2] font-normal">${element.others.views}</p>
                        
                      </div>

                </div>

              </div>
        `;
        cardContainer.appendChild(div); 
    })

 
    
    

}



// ===============Times======================



const getTime=(times)=>{

const minute =Math.floor(times / 60);
const hour =Math.floor(minute / 60);
const mainMinute=Math.floor(minute - hour*60)

    return `<div class="bg-black text-white p-1 rounded absolute  text-sm text-center w-2/4 top-[150px] left-[150px]"> ${hour} hrs ${mainMinute} min ago </div>`;
}

// =====sort view==============


const sortViewButton=document.getElementById("sort-view");
sortViewButton.addEventListener("click",()=>{
    sortByViews();

})

const  sortByViews = () =>{
    const cardContainer = document.getElementById("card-container");


    const sortData = Array.from(cardContainer.children);

    
    sortData.sort((a,b) =>{
        const A=parseInt(a.dataset.views);
        const B = parseInt(b.dataset.views);
        return B-A;
    } );

    cardContainer.innerHTML ="";
    sortData.forEach((video)=>{
        cardContainer.appendChild(video)
    });
};



//================== card default==========================

const getNoContent=(content)=>{
    const contentId=document.getElementById("no-content")

    if(content.length<1){
        contentId.classList.remove("hidden");
    }else{
        contentId.classList.add("hidden");
    }
}



handleCategory()

handleNews("1000")

