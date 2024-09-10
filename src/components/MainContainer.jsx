import React, { useEffect, useState, useRef } from "react";

const MainContainer = () => {
  const [timeZones, setTimeZones] = useState([]);
  const [selectedTimeZone, setSelectedTimeZone] = useState("");
  const [bannerImage, setBannerImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [formData, setFormData] = useState({
    eventName: "",
    eventDate: "",
    timeZone: "",
    startTime: "",
    endTime: "",
    description: "",
    bannerimage: "",
    videoLink: "",
  });
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  // Fetch Time Zone
  useEffect(() => {
    const fetchTimeZone = async () => {
      const response = await fetch("http://worldtimeapi.org/api/timezone");
      const data = await response.json();
      setTimeZones(data);
    };
    fetchTimeZone();
  }, []);

  // Handle File Input Change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBannerImage(e.target.result);
        setFormData({
          ...formData,
          bannerimage: file.name,
        });
      };
      reader.readAsDataURL(file);
      // Clear the input value
      event.target.value = "";
    }
  };

  // Handle Drag Events
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBannerImage(e.target.result);
        setFormData({
          ...formData,
          bannerimage: file.name,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Click to Upload
  const handleClickUpload = () => {
    fileInputRef.current.click();
  };

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Form Validation
    if (!formData.eventName) newErrors.eventName = "Event name is required";
    if (!formData.eventDate) newErrors.eventDate = "Event date is required";
    if (!formData.timeZone) newErrors.timeZone = "Time zone is required";
    if (!formData.startTime) newErrors.startTime = "Start time is required";
    if (!formData.endTime) newErrors.endTime = "End time is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (!formData.bannerimage)
      newErrors.bannerimage = "Banner image is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted", formData);
    }
  };

  return (
    <main className="px-8 py-6">
      <div className="bg-white dark:bg-gray-800 px-8 py-6 rounded-lg shadow-lg max-w-2xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
            Create an event
          </h1>
          {/* Error Banner */}
          {Object.keys(errors).length > 0 && (
            <div className="mb-4 p-4 text-[#C40006D3] dark:text-[#FF9592] dark:bg-[#FF173F2D] bg-[#F3000D14] rounded-lg">
              <p className="font-semibold">Missing fields:</p>
              {errors.eventName && <p>- Event name</p>}
              {errors.eventDate && <p>- Event date</p>}
              {errors.timeZone && <p>- Time zone</p>}
              {errors.startTime && <p>- Start time</p>}
              {errors.endTime && <p>- End time</p>}
              {errors.description && <p>- Description</p>}
              {errors.bannerimage && <p>- Banner Image</p>}
            </div>
          )}
          <label className="block text-[#1D211C] dark:text-[#FFFFFF] mb-2">
            Event Name
          </label>
          <input
            type="text"
            name="eventName"
            value={formData.eventName}
            onChange={handleChange}
            placeholder="Your event name"
            className={`w-full py-2 px-4 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 outline-none ${
              errors.eventName
                ? "border border-red-500 focus:ring-red-500"
                : "focus:ring-blue-500"
            }`}
          />
        </div>

        <div className="mb-6">
          <label className="block text-[#1D211C] dark:text-[#FFFFFF] mb-2">
            Date & Time
          </label>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <input
              type="date"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
              className={`w-full py-2 px-4 mt-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 outline-none ${
                errors.eventDate
                  ? "border border-red-500 focus:ring-red-500"
                  : "focus:ring-blue-500"
              }`}
            />
            <select
              name="timeZone"
              value={formData.timeZone}
              onChange={(e) => {
                setFormData({ ...formData, timeZone: e.target.value });
                setSelectedTimeZone(e.target.value);
              }}
              className={`w-full py-2 px-4 mt-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white outline-none ${
                errors.timeZone
                  ? "border border-red-500 focus:ring-red-500"
                  : "focus:ring-blue-500"
              }`}
            >
              <option value="" disabled>
                Select Time Zone
              </option>
              {timeZones.map((zone) => (
                <option key={zone} value={zone}>
                  {zone}
                </option>
              ))}
            </select>
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              placeholder="Start time"
              className={`w-full py-2 px-4 mt-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 outline-none ${
                errors.startTime
                  ? "border border-red-500 focus:ring-red-500"
                  : "focus:ring-blue-500"
              }`}
            />
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              placeholder="End time"
              className={`w-full py-2 px-4 mt-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 outline-none ${
                errors.endTime
                  ? "border border-red-500 focus:ring-red-500"
                  : "focus:ring-blue-500"
              }`}
            />
          </div>
          <div className="mb-6">
            <label className="block text-[#1D211C] dark:text-[#FFFFFF] mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Add event description..."
              className={`w-full py-2 mt-2 px-4 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 outline-none ${
                errors.description
                  ? "border border-red-500 focus:ring-red-500"
                  : "focus:ring-blue-500"
              }`}
              rows="4"
            ></textarea>
          </div>
          <div className="mb-6">
            <label className="block text-[#1D211C] dark:text-[#FFFFFF] mb-2">
              Video
            </label>
            <div className="relative w-full mt-2">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fa-solid fa-link text-gray-500 dark:text-gray-300"></i>
              </div>
              <input
                type="text"
                name="videoLink"
                value={formData.videoLink}
                onChange={handleChange}
                placeholder="Add video link..."
                className={`w-full py-2 pl-10 pr-4 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 outline-none ${
                  errors.videoLink
                    ? "border border-red-500 focus:ring-red-500"
                    : "focus:ring-blue-500"
                }`}
              />
            </div>
          </div>
          <label className="block text-[#1D211C] dark:text-[#FFFFFF] mb-2">
            Banner Image
          </label>
          <div
            className={`mb-8 mt-2 relative w-full h-64 border-2 ${
              isDragging ? "border-blue-500" : "border-gray-300"
            } border-dashed bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center cursor-pointer`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClickUpload}
          >
            <input
              type="file"
              ref={fileInputRef}
              className="absolute inset-0 opacity-0 cursor-pointer"
              accept="image/*"
              onChange={handleFileChange}
            />
            {!bannerImage ? (
              <div className="text-center text-gray-500 dark:text-gray-300">
                <p>Click to upload or drag and drop</p>
                <p className="text-sm">
                  SVG, PNG, JPG or GIF (recommended size 1024x1024px)
                </p>
              </div>
            ) : (
              <img
                src={bannerImage}
                alt="Banner"
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
              />
            )}
          </div>
          <div>
            <button
              className="bg-[#00970016] dark:bg-[#70FE8C1B] text-[#006514D5] dark:text-[#89FF9FCD] py-2 px-6 rounded-lg transition"
              onClick={handleSubmit}
            >
              Create event
            </button>
            <button className="bg-inherit dark:bg-inherit dark:text-[#AFB5AD] text-[#60655F] py-2 px-6 ml-5 rounded-lg transition">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainContainer;
