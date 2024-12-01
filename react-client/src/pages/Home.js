import React, { useState } from "react";
import "../page-styles/Home.css";
import Room from "./Room";
import { useNavigate } from "react-router-dom";
export default function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="d-flex  flex-column w-100">
      <div
        className="d-flex flex-column align-items-center justify-content-center bg-primary"
        style={{ height: "500px" }}
      >
        <div className="d-flex flex-row">
          <div
            className="h1 text-white"
            style={{ fontSize: "47px", fontStyle: "italic" }}
          >
            Unleash Your Artistic Potential
          </div>
          <div className="" style={{ width: "150px" }}></div>
        </div>
        <div className="d-flex flex-row">
          <div className="" style={{ width: "150px" }}></div>
          <div
            className="h1 text-white"
            style={{ fontSize: "50px", fontStyle: "italic" }}
          >
            Connect and Draw Online!
          </div>
        </div>
      </div>
      {/* Cards */}
      <div className="d-flex flex-wrap align-content-center justify-content-center gap-5 w-100 mt-5">
        
        <Room type='create' />
        <Room type='join' />

        <div
          className="card h-auto p-3"
          style={{ width: "300px", alignContent: "center" }}
        >
          <div className="card-body d-flex flex-column justify-content-between">
            <h5 className="card-title">Explore</h5>
            <div className="card-text mb-3">
              {/* Get inspiration from other users! */}
              Explore more ways to express your creativity  and get inspired by other artist. Share your art with the world!
            </div>
            <div className="d-flex btn btn-primary justify-content-center"
            onClick={ (event) => {
              navigate('/gallery')
            }}>
              Explore
            </div>
          </div>
        </div>
      </div>


      <div className="bg-light mt-5" style={{ width: "100%", height: "250px"}}>
        <div className="d-flex flex-row justify-content-around mt-5">
            <div className="w-50 ps-5" style={{textAlign: "justify"}}>
            Welcome to MIT-Draw, the ultimate online collaborative drawing platform! With MIT-Draw, art knows no bounds as users from around the world come together to unleash their creativity in a seamless and immersive experience.
            </div>
            <div className="d-flex flex-row justify-content-around w-50">
                <div className="d-flex flex-column align-items-start">
                    <div className="font-weight-bold" style={{fontWeight: "bold"}}>Navigation</div>
                    <div className="">About</div>
                    <div className="">Home</div>
                    <div className="">Editor</div>
                    <div className="">Gallery</div>
                </div>
                <div className="d-flex flex-column align-items-start">
                    <div className="" style={{fontWeight: "bold"}}>Legal</div>
                    <div className="">Terms of Service</div>
                    <div className="">Privacy Policy</div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
