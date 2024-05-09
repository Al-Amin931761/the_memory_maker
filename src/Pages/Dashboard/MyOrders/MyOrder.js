const MyOrder = ({ index, data }) => {
  const {
    name,
    email,
    country,
    address,
    city,
    state,
    postalCode,
    phoneNumber,
    transactionId,
    amount,
    order,
    fullDate,
    time,
  } = data;

  return (
    <tr>
      <td className="text-center px-4">{index + 1}</td>
      <td className="text-center px-4">{name}</td>
      <td className="text-center px-4">{email}</td>
      <td className="text-center px-4">{phoneNumber}</td>
      <td className="text-center px-4">{country}</td>
      <td className="text-center px-4">{address}</td>
      <td className="text-center px-4">{state}</td>
      <td className="text-center px-4">{city}</td>
      <td className="text-center px-4">{postalCode}</td>
      <td className="text-center px-4">{fullDate}</td>
      <td className="text-center px-4">{time}</td>
      <td className="text-center px-4">${amount}</td>
      <td className="text-center px-4">{transactionId}</td>
      <td className="text-center px-4 text-nowrap">
        {order.map((data) => (
          <div key={data._id}>
            <p>
              {data.name} ({data.quantity})
            </p>
          </div>
        ))}
      </td>
    </tr>
  );
};

export default MyOrder;
