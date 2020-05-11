import React from "react";
import { Card, Icon, Image } from 'semantic-ui-react';



function ResidentsCard({ resident }) {
    return (
        <Card>
            <Image src={require('./../images/profile1.jpg')} wrapped ui={false} />
            <Card.Content>
                <Card.Header>
                    {resident.geslachtsnaam}
                </Card.Header>
                <Card.Meta>
                    <span classname='names' >{resident.voornamen}</span>
                </Card.Meta>
                <Card.Description>
                    <p>
                        {resident.postcode} - {resident.huisnummer}
                    </p>
                    <p>
                        {resident.gemeente}
                    </p>
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <a>
                    <Icon name='tag' />
                    {resident.BSN}
                </a>
            </Card.Content>
        </Card>
    );
}

export default ResidentsCard;