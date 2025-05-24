import React from "react";
import "./Checkout.css";
import { useState, useEffect } from "react";
import LabeledInput from "../Custom/LabeledInput";
import Item from "../Cart/Item";
import DropdownSelection from "../Custom/DropdownSelection";
import usePlacesAutocomplete from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

function DeliveryContainer({
  handleOrderSubmit,
  orderData,
  setOrderData,
  user,
  itemList,
}) {
  const [ordersSelected, setordersSelected] = useState(true);
  const [shippingSelected, setshippingSelected] = useState(true);
  const [deliverySelected, setdeliverySelected] = useState(false);
  const [addressComponents, setAddressComponents] = useState({
    city: "",
    zipcode: "",
    province: "",
    country: "",
  });
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState("");
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
  } = usePlacesAutocomplete({ callbackName: "initMap" });

  const [firstName, setFirstName] = useState(user?.firstname);
  const [lastName, setLastName] = useState(user?.lastname);
  const [phoneNumber, setPhoneNumber] = useState(user?.mobile);

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    if (!e.target.value) return e.target.value;
    const phoneNumber = e.target.value.replace(/[^\d]/g, "");
    var formattedPhoneNumber = "";
    const length = phoneNumber.length;
    if (length < 4) formattedPhoneNumber = phoneNumber;
    if (length < 7)
      formattedPhoneNumber = `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
        3
      )}`;
    formattedPhoneNumber = `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
      3,
      6
    )}-${phoneNumber.slice(6, 10)}`;

    setPhoneNumber(formattedPhoneNumber);
  };

  const handleSelect = (address) => {
    setValue(address, false);
  };

  const extractAddressComponents = (address) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (status === "OK") {
        const components = results[0].address_components;
        let longAddress = "";
        let streetnumber = "";
        let street = "";
        let city = "";
        let zipcode = "";
        let country = "";
        let province = "";
        for (let i = 0; i < components.length; i++) {
          const component = components[i];
          const types = component.types;
          if (types.includes("street_number")) {
            streetnumber = component.long_name;
          }
          if (types.includes("route")) {
            street = component.long_name;
          }
          if (types.includes("locality")) {
            city = component.long_name;
          }
          if (types.includes("postal_code")) {
            zipcode = component.long_name;
          }
          if (types.includes("country")) {
            country = component.long_name;
          }
          if (types.includes("administrative_area_level_1")) {
            province = component.long_name;
          }
        }
        setAddressComponents({ city, zipcode, province, country });
        if (streetnumber !== "") {
          longAddress = longAddress + streetnumber;
        }
        if (street !== "") {
          longAddress = longAddress + " " + street;
        }
        if (city !== "") {
          longAddress = longAddress + ", " + city;
        }
        if (province !== "") {
          longAddress = longAddress + ", " + province;
        }
        if (zipcode !== "") {
          longAddress = longAddress + ", " + zipcode;
        }
        if (country !== "") {
          longAddress = longAddress + ", " + country;
        }
        setDeliveryAddress(longAddress);
      }
    });
  };

  useEffect(() => {
    if (value) {
      extractAddressComponents(value);
    }
  }, [value]);

  const renderSuggestions = () => {
    const suggestions = data.map(({ place_id, description }) => (
      <ComboboxOption key={place_id} value={description} />
    ));
    return <>{suggestions}</>;
  };

  const handleNextStepShipping = (e) => {
    e.preventDefault();

    if (
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      phoneNumber.trim() === ""
    ) {
      return;
    }

    setshippingSelected(false);
    setdeliverySelected(true);
  };

  const handleRadioChange = (e) => {
    setSelectedDeliveryOption(e.target.value);
  };

  const handleNextStepDelivery = (e) => {
    e.preventDefault();
    if (selectedDeliveryOption) {
      setOrderData({
        ...orderData,
        deliveryAddress: deliveryAddress,
        deliveryOption: selectedDeliveryOption,
        fullName: `${firstName} ${lastName}`,
      });
    } else {
      console.log("No delivery option selected.");
    }
    setdeliverySelected(false);
  };

  return (
    <div className="col-md-8">
      <div className="card">
        <DropdownSelection
          label="Order Details"
          selected={ordersSelected}
          setSelected={setordersSelected}
        />
        {ordersSelected && (
          <div className="item-list-container">
            {itemList.map((item, index) => (
              <Item key={index} itemInfo={item} />
            ))}
          </div>
        )}

        <DropdownSelection
          label="Shipping Information"
          selected={shippingSelected}
          setSelected={setshippingSelected}
        />
        {shippingSelected && (
          <div className="wrapper">
            <div className="row">
              <LabeledInput
                className="col-md-6"
                name="firstname"
                type="text"
                label="First name"
                placeholder="Enter first name"
                required={true}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <LabeledInput
                className="col-md-6"
                name="lastname"
                type="text"
                label="Last name"
                placeholder="Enter last name"
                required={true}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <LabeledInput
                className="col-md-6"
                name="phonenumber"
                type="text"
                label="Phone number"
                placeholder="Enter phone number"
                required={true}
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
              />
              <Combobox className="col-md-12" onSelect={handleSelect}>
                <label>Address</label>
                <ComboboxInput
                  name="address"
                  type="text"
                  value={value}
                  onChange={handleInput}
                  disabled={!ready}
                  placeholder="Enter address"
                  required
                />
                <ComboboxPopover>
                  <ComboboxList>
                    {status === "OK" && renderSuggestions()}
                  </ComboboxList>
                </ComboboxPopover>
              </Combobox>
              <LabeledInput
                className="col-md-4"
                name="city"
                type="text"
                label="City"
                value={addressComponents.city}
                placeholder="Enter city"
                readOnly={true}
              />
              <LabeledInput
                className="col-md-4"
                name="province"
                type="text"
                value={addressComponents.province}
                label="Province"
                placeholder="Enter province"
                readOnly={true}
              />
              <LabeledInput
                className="col-md-4"
                name="postal code"
                type="text"
                value={addressComponents.zipcode}
                label="Postal code"
                placeholder="Enter postal code"
                readOnly={true}
              />
              <LabeledInput
                className="col-md-4"
                name="country"
                type="text"
                value={addressComponents.country}
                label="Country"
                placeholder="Enter country"
                readOnly={true}
              />
              <p className="col-md-12" />
              <div className="col-md-3" id="nextStep">
                <div className="info-group mb-3">
                  <button
                    className="btn"
                    type="submit"
                    onClick={handleNextStepShipping}
                  >
                    Next step
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="card">
        <DropdownSelection
          label="Delivery option"
          selected={deliverySelected}
          setSelected={setdeliverySelected}
        />
        {deliverySelected && (
          <div className="wrapper">
            <div className="row">
              <input
                className="col-md-2"
                type="radio"
                name="delivery"
                value="standard"
                onChange={handleRadioChange}
              />
              <div className="col-md-10">
                <div className="radio-selection mb-3">
                  <label className="radio-selection">
                    Standard delivery: Free, received within 2 weeks
                  </label>
                </div>
              </div>
              <input
                className="col-md-2"
                type="radio"
                name="delivery"
                value="nextDay"
                onChange={handleRadioChange}
              />
              <div className="col-md-10">
                <div className="radio-selection mb-3">
                  <label className="radio-selection">
                    Next day delivery: $12.99
                  </label>
                </div>
              </div>
              <div className="col-md-3" id="nextStep">
                <div className="info-group mb-3">
                  <form onSubmit={handleNextStepDelivery}>
                    <button
                      className="btn"
                      type="submit"
                      disabled={!selectedDeliveryOption}
                    >
                      Next step
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DeliveryContainer;
