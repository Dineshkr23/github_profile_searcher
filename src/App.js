import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

function App() {
  //UseRef for focus on input tag
  let foc = useRef();

  //State For User Name
  let [userName, setUserName] = useState("");

  //State For User Git Profile
  let [profile, setProfile] = useState({});

  //State for repositories
  let [repos, setrepos] = useState([]);

  //State For Display Card
  let [disp, setDisp] = useState(false);

  //State for Error Message
  let [err, setErr] = useState(false);

  //using useEffect for providing focus on imput tag on mounting
  useEffect(() => {
    foc.current.focus();
  });

  //Handler For Getting User Name Input
  let getUserName = (e) => {
    setUserName(e.target.value);
  };

  //Handler For Getting Git Profiles of User Name
  let getProfiles = (e) => {
    e.preventDefault();
    let gitUrl = `https://api.github.com/users/${userName}`;
    let repoUrl = `https://api.github.com/users/${userName}/repos`;

    //server call for getting profile info
    axios
      .get(gitUrl)
      .then((res) => {
        console.log(res.data);
        setProfile(res.data);
        setDisp(!disp);
        setErr(false);
      })
      .catch((error) => {
        setErr(!err);
        console.error(error);
      });

    //server call for getting repositories
    axios
      .get(repoUrl)
      .then((res) => {
        console.log(res.data);
        setrepos(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <>
      <div className="d-flex bg-light bg-gradient p-4  justify-content-center">
        <h1>
          <i class="fa fa-github" aria-hidden="true"></i>{" "}
          <span className="text-primary">Github Profile Tracer</span>
        </h1>
      </div>
      <div>
        <form onSubmit={getProfiles} className="d-flex col-6 m-auto mt-4">
          <input
            ref={foc}
            onChange={getUserName}
            type="text"
            placeholder="Enter User Name Here..."
            className="form-control mx-3"
          />
          <input type="submit" value="Search" className="btn btn-primary" />
        </form>
      </div>
      {err ? (
        <p className="text-danger mt-3 fw-bold">
          <i class="fa fa-exclamation-circle" aria-hidden="true"></i> User Name
          Not Found
        </p>
      ) : disp ? (
        <div className="row card w-50 m-auto mt-5">
          <div className="card header bg-light p-4"></div>
          <section className="row m-auto mt-4">
            <div className="col-6">
              <img className="rounded-circle" src={profile.avatar_url} alt="" />
            </div>
            <div className="col-6 m-auto ">
              <ul className="text-start list-unstyled fw-bold mx-4">
                <li>
                  <i class="fa fa-github" aria-hidden="true"></i>{" "}
                  <span className="text-primary">ID :</span> {profile.id}
                </li>
                <li>
                  <span className="text-primary">User Name :</span>{" "}
                  {profile.login}
                </li>
                <li>
                  <span className="text-primary">Name :</span> {profile.name}
                </li>
                <li>
                  <span className="text-primary">Profile Url :</span>{" "}
                  <a
                    className="text-dark"
                    href={profile.html_url}
                    target="blank"
                  >
                    {profile.html_url}
                  </a>
                </li>
                <li>
                  <span className="text-primary">Email :</span> {profile.email}
                </li>
                <li>
                  <span className="text-primary">Followers :</span>{" "}
                  {profile.followers}
                </li>
                <li>
                  <span className="text-primary">Following :</span>{" "}
                  {profile.following}
                </li>
                <li>
                  <span className="text-primary">Bio :</span> {profile.bio}
                </li>
                <li>
                  <span className="text-primary">Repositories :</span>
                </li>
                {repos.map((repo) => {
                  return (
                    <ul>
                      <li>
                        <a
                          className="text-dark"
                          target="blank"
                          href={repo.html_url}
                        >
                          {repo.html_url}
                        </a>
                      </li>
                    </ul>
                  );
                })}
              </ul>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}

export default App;
