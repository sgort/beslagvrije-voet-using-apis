import React from "react";
import { Card, Icon } from 'semantic-ui-react';



function ResidentsCard({ resident }) {
    return (
        <Card>
            <Card.Content>
                <Card.Header>
                    <Icon name="address card outline" /> {resident.geslachtsnaam}
                </Card.Header>
                <Card.Description>
                    <p>
                        <Icon name="clock outline" /> {resident.voornamen}
                    </p>
                    <p>
                        <Icon name="stop circle outline" /> {resident.postcode} {resident.huisnummer}
                    </p>
                    <p>
                        <Icon name="code" /> {resident.gemeente}
                    </p>
                </Card.Description>
            </Card.Content>
        </Card>
    );
}

export default ResidentsCard;