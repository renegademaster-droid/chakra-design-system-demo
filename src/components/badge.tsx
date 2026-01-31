import React from "react";
import { Badge as ChakraBadge } from "@chakra-ui/react";
import type { BadgeProps } from "@chakra-ui/react";

const Badge: React.FC<BadgeProps> = (props) => <ChakraBadge {...props} />;

export default Badge;
