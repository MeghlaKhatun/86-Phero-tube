const handleCategory= async ()=>{
    const response=await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data =await response.json();
    
    const categoryList=document.getElementById("category-list");

    data.data.forEach((element) => {
        handleNews(element.category_id);
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
    console.log(data.data)

   

    const cardContainer=document.getElementById("card-container");
    cardContainer.textContent="";

    data.data?.forEach((element) => {
        const div=document.createElement("div");
        div.innerHTML=`
        <div class="card card-compact h-[350px]  bg-base-100 shadow-xl">
                <figure><img class="w-full h-[200px]" src=${element.thumbnail} /></figure>
                <p class="absolute bg-black text-[10px] text-white p-1 rounded-[4px] ml-[250px] mt-[150px]">${element.others.posted_date} </p>

                <div class="flex p-5">

                <div>
                <img class="w-[40px] h-[40px] mt-4 rounded-full" src=${element.authors[0]?.profile_picture} alt="">
            </div>

                    <div class="card-body">
                        <h2 class="card-title text-[16px] text-[#171717] font-bold">${element.title}</h2>
                        <p class="text-sm text-[#171717B2] font-normal">${element.authors[0]?.profile_name}</p>
                        <p class="text-sm text-[#171717B2] font-normal">${element.others.views}</p>
                      </div>

                </div>

              </div>
        `; 
        cardContainer.appendChild(div); 
    })
}

handleCategory()
