export default function VerifySection({ isVerified, user, setUser }) {
  // If already verified → don’t show anything
  if (isVerified) return null;

  return (
    <>
      <h2>Review your details</h2>

      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          value={user.name}
          maxLength="30"
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
      </div>

      <h2>Let's verify your account</h2>
      <p className="verify-text">
        We will send you a confirmation code by SMS on the next step.
      </p>

      <div className="phone-group">
        <span>+91</span>
        <input
          type="tel"
          value={user.phone}
          onChange={(e) => setUser({ ...user, phone: e.target.value })}
          placeholder="Mobile Phone Number"
        />
      </div>
    </>
  );
}
