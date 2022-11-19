import React from "react";
import Header from "../components/PageNavbar";
import Footer from "../components/Footer";

export default function CreateCategory() {
  return (
    <div className="h-screen">
      <Header />
      <h2> Categories </h2>
      <form>
        <label
          htmlFor="catName"
          className="block text-2xl  mb-2 input-label text-left"
        >
          CatName
        </label>
        <input
          type="text"
          name="catName"
          id="catName"
          // value={payload.catName}
          required={true}
          // onChange={addData}
        />
        <div>
          <div
            className="h-64 w-full flex mt-10 justify-center items-center border rounded relative"
            style={{
              background: payload.url ? "" : "rgba(0,0,0, .3) center",
            }}
          >
            <div className="cursor-pointer">
              {payload.url ? (
                <img alt="" src={payload.url} className="h-64 w-full" />
              ) : (
                <div className="relative w-40 h-[7em]  text-base  text-feint rounded flex-col items-center	justify-center">
                  <div className="flex items-center justify-center mt-5">
                    <FiUploadCloud size={40} className="text-white" />
                  </div>
                  <p className="underline underline-offset-4 text-center text-white">
                    Select Image
                  </p>
                </div>
              )}
              <input
                onChange={handleImageUpload}
                type="file"
                name="image"
                className="opacity-0 w-full absolute top-0 bottom-0 left-0 right-0 border cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="flex mx-auto justify-center my-10 w-full">
          <button
            className="bg-slate-900 text-white text-xl shadow rounded-md w-full h-[40px]"
            type={"submit"}
            disabled={isSubmitting}
          >
            {" "}
            {isSubmitting
              ? "Sending..."
              : state
              ? "Update category"
              : "Create category"}{" "}
          </button>
        </div>
      </form>
      <Footer />
    </div>
  );
}
