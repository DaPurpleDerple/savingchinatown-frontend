import React from "react";
import { Button } from "antd";
import { EmailSubscription } from "./EmailSubscription";
import { LogEngagementEvent } from "../Logging";

export class CallToActionButton extends React.Component {
  render() {
    var place = this.props.place;
    var size = this.props.size;
    const className =
      size === "large" ? "large-primary-button" : "secondary-button";
    return (
      <div key={place.placeID}>
        {place.giftCardURL && (
          <Button
            shape="round"
            size={size}
            className={className}
            type="default"
            onClick={event => {
              LogEngagementEvent(
                "user-click",
                "get-gift-card-" + size,
                place.placeID
              );
              window.open(place.giftCardURL);
            }}
          >
            Get Gift Card
          </Button>
        )}
        {!place.giftCardURL && (
          <Button
            shape="round"
            size={size}
            className={className}
            type="default"
            onClick={event => {
              LogEngagementEvent(
                "user-click",
                place.takeoutURL ? "takeout" : "contact",
                place.placeID
              );
              place.takeoutURL
                ? window.open(place.takeoutURL)
                : window.open(place.placeURL);
            }}
          >
            {place.takeoutURL ? "Order Takeout" : "Contact them"}
          </Button>
        )}
      </div>
    );
  }
}
