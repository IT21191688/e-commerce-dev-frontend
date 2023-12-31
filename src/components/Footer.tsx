import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faGoogle,
  faInstagram,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <>
      <footer className="text-center text-white bg-indigo-700">
        <div className="container">
          <section className="mt-5">
            <div className="grid grid-cols-5 gap-4">
              <div className="col-md-2 mt-3">
                <h6 className="text-uppercase font-bold">
                  <a href="#!" className="text-white">
                    About us
                  </a>
                </h6>
              </div>
              <div className="col-md-2 mt-3">
                <h6 className="text-uppercase font-bold">
                  <a href="#!" className="text-white">
                    Products
                  </a>
                </h6>
              </div>
              <div className="col-md-2 mt-3">
                <h6 className="text-uppercase font-bold">
                  <a href="#!" className="text-white">
                    Awards
                  </a>
                </h6>
              </div>
              <div className="col-md-2 mt-3">
                <h6 className="text-uppercase font-bold">
                  <a href="#!" className="text-white">
                    Help
                  </a>
                </h6>
              </div>
              <div className="col-md-2 mt-3">
                <h6 className="text-uppercase font-bold">
                  <a href="#!" className="text-white">
                    Contact
                  </a>
                </h6>
              </div>
            </div>
          </section>

          <hr className="my-5" />

          <section className="mb-5">
            <div className="flex justify-center">
              <div className="col-lg-8">
                <p className="text-white">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
                  distinctio earum repellat quaerat voluptatibus placeat nam,
                  commodi optio pariatur est quia magnam eum harum corrupti
                  dicta, aliquam sequi voluptate quas.
                </p>
              </div>
            </div>
          </section>
          <section className="text-center mb-5">
            <a href="#" className="text-white me-4">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="#" className="text-white me-4">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="#" className="text-white me-4">
              <FontAwesomeIcon icon={faGoogle} />
            </a>
            <a href="#" className="text-white me-4">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="#" className="text-white me-4">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a href="#" className="text-white me-4">
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </section>
        </div>

        <div className="text-center p-3 bg-black bg-opacity-20">
          © 2020 Copyright:
          <a className="text-white" href="https://mdbootstrap.com/">
            The Shop PVT(Ltd)
          </a>
        </div>
      </footer>
    </>
  );
}
