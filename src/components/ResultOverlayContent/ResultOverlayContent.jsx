const ResultOverlayContent = ({ result }) => {
  return (
    <div className="overflow-auto">
      <em>
        <strong>ID</strong>
      </em>
      <br />
      {result.id}
      <br />
      <em>
        <strong>Name</strong>
      </em>
      <br />
      {result.name}
      <br />
      <em>
        <strong>Email</strong>
      </em>
      <br />
      {result.email}
      <br />
      <em>
        <strong>Password</strong>
      </em>
      <br />
      {result.password}
      <br />
      <em>
        <strong>Occupation</strong>
      </em>
      <br />
      {result.occupation}
      <br />
      <em>
        <strong>State</strong>
      </em>
      <br />
      {result.state}
      <br />
    </div>
  );
};

export default ResultOverlayContent;
