import React, { useRef } from "react";
import { FiUploadCloud } from "react-icons/fi";
import Header from "../../components/Navbar";
// import Footer from "../../components/Footer";
import { useNavigate, useLocation } from "react-router-dom";
// import { IArrowBack } from "../../utils/mock";
// import Alert from "../../utils/alert";
import { useCategoriesContext } from "../../contexts/category";



export default function CreateCategory() {
    const { state } = useLocation()
    const navigate = useNavigate();
    const form = useRef();
    const { handleChange, createCatgeory, isLoading, category} = useCategoriesContext()

    return (
                <form
                    ref={form}
                    className="modal__one border-t-2  md:w-[600px] sm:w-80 w-full   mb-5"
                    onSubmit={createCatgeory}>
                    <div className="mt-10">
                        <div className="flex items-center">
                            {/* <img
                                src={IArrowBack}
                                alt="arrow back"
                                className="w-9 cursor-pointer mr-2 sm:mr-5 mt-1 hover:bg-slate-500 p-2 rounded-full"
                                onClick={(_) => navigate(-1)}
                            />{" "} */}
                            <strong className="text-lg sm:text-2xl">{state ? "Update Category" : "Create Category"}</strong>
                        </div>

                        <div>
                        <h2 className="mb-3 mt-10 text-3xl pt-3 text-center text-md">
									Category Image
								</h2>
                            <div
                                className="h-64 w-full flex mt-10 justify-center items-center border rounded relative" style={{ background: category.image ? "" : "rgba(0,0,0, .3) center" }}>
                                <div
                                    className="cursor-pointer">
                                    {category.image ? (
                                        <img alt="" src={URL.createObjectURL(category.image)} className="h-64 w-full" />
                                    ) : (
                                        <div className="relative w-40 h-[7em]  text-base  text-feint rounded flex-col items-center	justify-center">
                                            <div className="flex items-center justify-center mt-5">
                                                <FiUploadCloud size={40} className="text-slate-500" />
                                            </div>
                                            <p className="underline underline-offset-4 text-center text-slate-500">
                                                Select Image
                                            </p>
                                        </div>
                                    )}
                                    <input onChange={handleChange} type="file" name="image" className="opacity-0 w-full absolute top-0 bottom-0 left-0 right-0 border cursor-pointer" />
                                </div>
                            </div>
                           

                            <div className="w-full mt-10">
                                <label htmlFor="description" className="block text-2xl font-bold mt-2 input-label text-left"> Category Name <span style={{ top: "2px", color: "red" }} className="relative">*</span></label>
                                <input
                                    value={category.name}
                                    name={"name"}
                                    className={"p-5 mt-3 text-2xl h- shadow rounded border-transparent  focus:border focus:border-black w-full"}
                                    type="text"
                                    required={true}
                                    onChange={handleChange}
                                    placeholder="Enter post title..."
                                />
                            </div>

                        </div>

                        <div className="flex mx-auto justify-center  my-10 w-full">
                            <button
                                className="bg-slate-900 text-white shadow rounded-md text-2xl w-full h-[40px]"
                                type={"submit"}
                                disabled={isLoading}>
                                {" "}
                                {isLoading ? "Sending..." : state ? "Update Category" : "Create Category"}{" "}
                            </button>
                        </div>
                    </div>
                </form>
    );
}