import React, { useState } from "react";

function LoginForm(): JSX.Element {
  const [formData, setFormData] = useState({ keyId: "", accessKey: "" });

  return (
    <div>
      <form action="#">
        <div>
          <label htmlFor="Access key Id">Access key Id</label>
          <input type="text" placeholder="Access key Id" name="Access key Id" />
        </div>
        <div>
          <label htmlFor="Secret access key">Secret access key</label>
          <input
            type="text"
            placeholder="Secret access key"
            name="Secret access key"
          />
        </div>
        <div>
          <button>Cancel</button>
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
