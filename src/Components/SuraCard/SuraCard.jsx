import { Link } from "react-router";
import { motion } from 'motion/react';
import React from "react";
 function SuraCard({sura}) {
  return (
    <motion.div
              
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }} // Smooth transition
            >
              <Link
                to={`/sura/${sura.number}`}
                className=" my-2  text-black  dark:text-white dark:hover:bg-gradient-to-r dark:hover:from-emerald-800/5 dark:hover:to-emerald-800/10 dark:bg-gray-800 dark:shadow-4xl hover:cursor-pointer  shadow px-3 py-5 rounded flex items-center  group transition-all duration-750">
                <div className="flex items-center w-full justify-between">
                  <div className="my-2 flex items-center gap-4">
                    <span className="bg-gradient-to-br text-2xl from-emerald-500 to-blue-500   group-hover:scale-110 transition-all duration-700 rounded-xl text-white px-4 py-2">
                      {sura.number}
                    </span>
                    <div className="">
                      <p className="text-gray-900 dark:text-white sm:text-2xl">
                        {sura.name.replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, '')}
                      </p>
                      <p className="text-gray-600 dark:text-white sm:text-2xl">
                        {sura.englishName}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {sura.englishNameTranslation}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    {sura.revelationType === "Meccan" ? (
                      <p className="text-emerald-700 bg-emerald-400 dark:bg-emerald-900  text-center px-4 py-1 dark:text-emerald-300 rounded-2xl">
                        {sura.revelationType}
                      </p>
                    ) : (
                      <p className="text-blue-900 text-center dark:text-blue-300 dark:bg-blue-900 px-4 py-1 bg-blue-300 rounded-2xl">
                        {sura.revelationType}
                      </p>
                    )}

                    <p>{sura.numberOfAyahs}verses</p>
                  </div>
                </div>
              </Link>
            </motion.div>
  )
}
export default React.memo(SuraCard)