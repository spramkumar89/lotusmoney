function cards({ userCards }) {
  return (
    <div className="px-4 py-2">
      {userCards.map((card, key) => (
        <div className="justify-center" key={key}>
          {card}
        </div>
      ))}
    </div>
  );
}

export default cards;
