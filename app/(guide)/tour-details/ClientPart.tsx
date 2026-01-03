const ClientPart = ({ clientName }: { clientName: string }) => {
  const handleInitial = () => {
    const data = clientName.split(" ").map((e: string) => {
      return e.split("")[0].toUpperCase();
    });
    console.log(data);
    return data;
  };

  return (
    <div className=" max-w-8/12 grid grid-cols-[1fr_2fr] comp-bg rounded-md mt-4 p-2">
      <div className="border-r border-r-amber-300 grid gap-2 place-items-center p-2">
        <div className="w-32 h-32 rounded-full text-4xl ele-bg border-2 border-amber-300 flex justify-center items-center">
          {handleInitial()}
        </div>

        <h4>{clientName}</h4>
      </div>

      <div className="grid grid-cols-2">
        <div className="grid gap-4  pl-4">
          <div>
            <label>Contact Info</label>
            <div className="flex gap-4">
              <div>email logo</div>
              <div>email</div>
            </div>
            <div className="flex gap-4">
              <div> phone logo</div>
              <div>number</div>
            </div>
          </div>

          <div>
            <label>Languages</label>
            <div className="flex gap-4">
              <div>logo</div>
              <div>languages1, lang2</div>
            </div>
          </div>
        </div>

        {/* asd */}

        <div>
          <label>Last Experience</label>
          <p className="italic">"his review"</p>
        </div>
      </div>
    </div>
  );
};

export default ClientPart;
