import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import FolderIcon from "@mui/icons-material/Folder";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import React from 'react';

export class Folder extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isExpanded: this.props.isInitiallyExpanded || false };
    }
    toggle = () => {
        this.setState(prevState => ({ isExpanded: !prevState.isExpanded }));
    }

    render() {
        const { name, children } = this.props;
        const { isExpanded } = this.state;
        return (
            <List disablePadding>
                <ListItem onClick={this.toggle}>
                    <IconButton>
                        {isExpanded ? <ExpandMoreIcon /> : <ChevronRightIcon />}
                    </IconButton>
                    <FolderIcon />
                    <ListItemText primary={name} />
                </ListItem>
                {isExpanded && (
                    <List component="div" disablePadding>
                        {children.map((child, index) => React.cloneElement(child, { key: index }))}
                    </List>
                )}
            </List>
        );
    }
}