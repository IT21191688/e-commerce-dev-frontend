import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "./services/AlertService";

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();

  const [verificationCode, setVerificationCode] = useState("");
  const [systemVerificationCode, setSystemVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [email, setEmail] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    alert(verificationCode + "   " + systemVerificationCode);

    if (verificationCode == systemVerificationCode) {
      try {
        const response = await axios.post(
          "https://div-stack-backend.onrender.com/api/v1/user/resetPassword",
          {
            email,
            newPassword,
          }
        );

        if (response.data.data.changed === true) {
          showSuccessToast(
            "Password changed successfully. Please log in again."
          );

          setTimeout(() => {
            navigate("/login");
            window.location.reload();
          }, 2000);
        } else {
          showErrorToast("Password not changed. Please try again.");
        }
      } catch (error) {
        alert("Something went wrong" + error);
        console.error(error);
      }
    } else {
      showErrorToast("Verification Code Wrong");
    }
  };

  const getCode = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://div-stack-backend.onrender.com/api/v1/user/sendVerificationCode",
        {
          email,
        }
      );

      if (response.data.isSuccessful === true) {
        showSuccessToast("Please Check the Email.");
        setSystemVerificationCode(response.data.data.verificationCode);
        //alert(response.data.data.verificationCode);
      } else {
        showErrorToast("Please try again");
      }
    } catch (error) {
      showErrorToast("Something went wrong");
      console.error(error);
    }
  };

  const cancel = () => {
    navigate("/login");
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <form>
            <h2 className="text-center mb-4">Reset Your Password</h2>

            <input type="hidden" name="remember" defaultValue="true" />
            <div className="form-group">
              <label htmlFor="email-address">Email address</label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                value={email}
              />
            </div>
            <br />
            <div className="d-grid gap-2">
              <button
                type="button"
                className="btn btn-primary btn-block"
                onClick={getCode}
              >
                Get Code
              </button>
            </div>
            <br />

            <div className="form-group">
              <label htmlFor="verification-code">Verification Code</label>
              <input
                type="number"
                className="form-control"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">New Password</label>
              <input
                name="password"
                type="password"
                required
                className="form-control"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <br />

            <div className="d-grid gap-2">
              <button
                type="button"
                className="btn btn-primary btn-block"
                onClick={handleSubmit}
              >
                Reset Password
              </button>
              <button
                type="button"
                className="btn btn-danger btn-block"
                onClick={cancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
