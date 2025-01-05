const MapContainer = () => {
  return (
    <div className="MapContainerContainer  ">
      <div className="mapContent  w-full ">
        <iframe
          className="w-full"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1272.8153083375907!2d90.3898780880108!3d23.888659616659925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c4696500bc7f%3A0xb7f8c7a09aab22ac!2sIUBAT%2C%20Dhaka%201230!5e1!3m2!1sen!2sbd!4v1736058280947!5m2!1sen!2sbd"
          width="600"
          height="450"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default MapContainer;
