import React, { useEffect, useState } from "react";
import SectionTitle from "../../../../components/shared/SectionTitle";
import Print from "../../../../components/Print/Print";

const RandomPrints = ({ id }) => {
  const [prints, setPrints] = useState([]);

  // load prints data from database
  useEffect(() => {
    fetch(`https://the-memory-maker-server.vercel.app/allPrint`)
      .then((res) => res.json())
      .then((data) => setPrints(data));
  }, []);

  // create random full array
  const randomFullIndexArray = [];
  for (let i = prints.length - 1; i >= 0; i--) {
    randomFullIndexArray.push(prints[Math.floor(Math.random() * i)]);
  }

  // reduce the same print
  const randomIndexArray = randomFullIndexArray.filter(
    (element, index, array) => array.indexOf(element) === index
  );

  // remove detail page print from the random array
  const randomPrints = randomIndexArray.filter(
    (randomPrint) => randomPrint._id !== id
  );

  return (
    <div>
      <SectionTitle title="You may also like" />

      <div className="prints-container mt-4">
        {randomPrints.slice(0, 3).map((data) => (
          <Print key={data._id} data={data} />
        ))}
      </div>
    </div>
  );
};

export default React.memo(RandomPrints);
