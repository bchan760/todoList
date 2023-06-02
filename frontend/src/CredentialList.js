import React from "react";
import { Link } from "react-router-dom";

function CredentialListHeader() {
  return (
    <thead>
      <tr>
        <th>Username</th>
        <th>Password</th>
      </tr>
    </thead>
  );
}

function CredentialListBody(props) {
  const rows = props.characterData.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.username}</td>
        <td>{row.password}</td>
        <td>
          <button onClick={() => props.removeCredential(index)}>
            Remove Credential
          </button>
        </td>
      </tr>
    );
  });
  return <tbody>{rows}</tbody>;
}

function CredentialList(props) {
  return (
    <table>
      <CredentialListHeader />
      <CredentialListBody
        credentialData={props.credentialData}
        removeCredential={props.removeCredential}
      />
      <Link to="/form">
        <button>Create New Task</button>
      </Link>
    </table>
  );
}

export default CredentialList;