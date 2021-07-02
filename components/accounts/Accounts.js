function accounts({ userAccounts }) {
  return (
    <div className="px-4 py-2">
      {userAccounts.map((acct, key) => (
        <div className="justify-center" key={key}>
          {acct}
        </div>
      ))}
    </div>
  );
}

export default accounts;
