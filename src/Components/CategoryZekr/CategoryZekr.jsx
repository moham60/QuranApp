
export default function CategoryZekr({name,items,handleOpen,active,handleActive,index}) {
  return (
      <div
          onClick={() => {
              handleOpen(name) 
              handleActive(index)
          }
              
          }
          className={`shadow-lg   ${active ? "bg-emerald-300 dark:bg-emerald-800 text-emerald-700 dark:text-emerald-600" :
              "bg-white dark:bg-[#1f2937] "
          }  px-4 py-8 group cursor-pointer hover:translate-y-[-12px] transition-all duration-1000 relative rounded-2xl`}>
              <div dir="rtl" >
          <h3 className="text-lg dark:text-white font-bold">{name}</h3>
              <div className="text-sm my-2 flex items-center gap-1 text-gray-500">
                  <span>{name.startsWith("أدعية") ? "دعاء" : "ذكر"}</span>
                   <span>{items.length}</span>
              </div>
             
        </div>
        
         
    </div>
  )
}
