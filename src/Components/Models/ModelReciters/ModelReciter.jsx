import { faClose, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { playPause } from '../../../redux/feature/Quran';

export default function ModelReciter({
    openModelReciters,
    handleModelRecitersClose,
    displayedRecent,
    setdisplayedRecent,
  getRecentReciters,
    getAllReciters,
    setcopyNameReciters,
    handleChangeInpt,
    getServerOfsura,
    setShowPlayer,
    setreceiterId,
    copyNameReciters,
    nameReciter,
    setnameReciter
}) {
     const dispatch = useDispatch();
    return (
        <>
            {openModelReciters && (
              <div className=" dark:bg-[#0807075d]   absolute modelofReciters left-0 right-0 top-0 bottom-0  ">
                <div className="fixed  dark:text-white w-[95%] sm:w-[60%] md:w-[40%] lg:w-[30%]   rounded z-50  bg-white shadow-lg  dark:bg-[#111827]  left-[50%] top-[50%]  transform translate-[-50%]">
                  <button
                    onClick={handleModelRecitersClose}
                    className="absolute right-[10px] hover:cursor-pointer top-[20px]">
                    <FontAwesomeIcon
                      icon={faClose}
                      className="text-gray-500 hover:text-gray-400"
                      style={{ fontSize: "22px" }}
                    />
                  </button>

                  <h2
                    className="my-4 p-3 text-2xl font-bold "
                    style={{ borderBottom: "1px solid gray" }}>
                    Select Reciters
                  </h2>

                  <>
                    <div className="flex displayedRecent border-b dark:border-gray-700">
                      {displayedRecent ? (
                        <>
                          <button
                            onClick={() => {
                             getAllReciters()
                              setdisplayedRecent(false);
                            }}
                            className={
                              "flex-1 py-2 px-4 dark:text-white border-0 text-sm font-medium  cursor-pointer"
                            }>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={16}
                              height={16}
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-user-round inline mr-2">
                              <circle cx={12} cy={8} r={5} />
                              <path d="M20 21a8 8 0 0 0-16 0" />
                            </svg>
                            All Reciters
                          </button>
                          <button
                            onClick={() => {
                              getRecentReciters();
                              setdisplayedRecent(true);
                            }}
                            className={
                              "flex-1 py-2 px-4 text-sm font-medium   cursor-pointer text-blue-700 border-b-1"
                            }>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={16}
                              height={16}
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-history inline mr-2">
                              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                              <path d="M3 3v5h5" />
                              <path d="M12 7v5l4 2" />
                            </svg>
                            Recent
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => {
                              setcopyNameReciters(allReciters);
                              setdisplayedRecent(false);
                            }}
                            className={
                              "flex-1 py-2 px-4 text-sm font-medium  cursor-pointer text-blue-700 border-b-1"
                            }>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={16}
                              height={16}
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-user-round inline mr-2">
                              <circle cx={12} cy={8} r={5} />
                              <path d="M20 21a8 8 0 0 0-16 0" />
                            </svg>
                            All Reciters
                          </button>
                          <button
                            onClick={() => {
                              getRecentReciters();
                              setdisplayedRecent(true);
                            }}
                            className={
                              "flex-1 py-2 px-4 dark:text-white border-0 text-sm font-medium  cursor-pointer"
                            }>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={16}
                              height={16}
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-history inline mr-2">
                              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                              <path d="M3 3v5h5" />
                              <path d="M12 7v5l4 2" />
                            </svg>
                            Recent
                          </button>
                        </>
                      )}
                    </div>

                    <div className="relative searchReciterNameInModel  p-4 w-full">
                      <input
                        onInput={(e) => handleChangeInpt(e.target.value)}
                        type="text"
                        id="simple-search"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="ابحث عن اسم القارئ"
                        required
                      />

                      <FontAwesomeIcon
                        icon={faSearch}
                        className="absolute left-[25px] top-[50%] transform translate-y-[-50%]"
                      />
                    </div>
                    <div className=" max-h-[250px] ModelNamesReciters   overflow-auto  ">
                      {copyNameReciters &&
                        copyNameReciters.map((ele) => (
                          <div key={ele.id}>
                            {ele.name === nameReciter ? (
                              <button
                                onClick={() => {
                                  setnameReciter(ele.name);
                                  handleModelRecitersClose();
                                  getServerOfsura(ele.id);
                                  setreceiterId(ele.id);
                                  setShowPlayer(true);
                                  dispatch(playPause(true));
                                }}
                                style={{ borderBlock: "2px solid gray" }}
                                className="flex gap-2 items-center bg-gray-700 hover:cursor-pointer  transition-all duration-150 w-full p-2   my-4">
                                <span
                                  style={{ borderRadius: "50%" }}
                                  className=" w-[35px] h-[35px] bg-blue-700 flex items-center justify-center  text-white">
                                  {ele.name.split("", 1).join()}
                                </span>
                                <div>
                                  <p>{ele.name}</p>
                                  <p className="text-gray-500">
                                    {ele.moshaf[0].name}
                                  </p>
                                </div>
                              </button>
                            ) : (
                              <button
                                name={ele.name}
                                onClick={() => {
                                  setnameReciter(ele.name);
                                  handleModelRecitersClose();
                                  getServerOfsura(ele.id);
                                  setreceiterId(ele.id);
                                  dispatch(playPause(true));
                                  setShowPlayer(true);
                                }}
                                style={{ borderBlock: "2px solid gray" }}
                                className="flex gap-2 items-center hover:bg-gray-800 hover:cursor-pointer  transition-all duration-150 w-full p-2   my-4">
                                <span
                                  style={{ borderRadius: "50%" }}
                                  className=" w-[35px] h-[35px] bg-blue-700 flex items-center justify-center  text-white">
                                  {ele.letter}
                                </span>
                                <div>
                                  <p>{ele.name}</p>
                                  <p className="text-gray-500">
                                    {ele.moshaf[0].name}
                                  </p>
                                </div>
                              </button>
                            )}
                          </div>
                        ))}
                    </div>
                  </>
                </div>
              </div>
            )}
        </>
 
  )
}
