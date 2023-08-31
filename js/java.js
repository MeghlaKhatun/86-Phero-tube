const handleButton= async ()=>{
    const response=await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data =await response.json();
    // console.log(data.data);

    const categoryList=document.getElementById("category-list");

    data.data.forEach((element) => {
        console.log(element)
        const div=document.createElement("div");
        div.innerHTML=`
        <a class="tab"><button class="py-[5px] px-[20px] text-[18px] font-semibold rounded-[4px] bg-[#25252526] text-[#252525B2] hover:bg-[#FF1F3D] hover:text-white">${element.category} </button></a>
        `;
        categoryList.appendChild(div)
    });
    
}

handleButton()