import { __assign, __extends } from "tslib";
import { PartyServiceServiceException as __BaseException } from "./PartyServiceServiceException";
export var CreatePartyInviteConfig;
(function (CreatePartyInviteConfig) {
    CreatePartyInviteConfig.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(CreatePartyInviteConfig || (CreatePartyInviteConfig = {}));
export var CreatePartyInput;
(function (CreatePartyInput) {
    CreatePartyInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(CreatePartyInput || (CreatePartyInput = {}));
export var CreatedInvite;
(function (CreatedInvite) {
    CreatedInvite.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(CreatedInvite || (CreatedInvite = {}));
export var CreatePartyOutput;
(function (CreatePartyOutput) {
    CreatePartyOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(CreatePartyOutput || (CreatePartyOutput = {}));
export var CreatePartyInviteInput;
(function (CreatePartyInviteInput) {
    CreatePartyInviteInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(CreatePartyInviteInput || (CreatePartyInviteInput = {}));
export var CreatePartyInviteOutput;
(function (CreatePartyInviteOutput) {
    CreatePartyInviteOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(CreatePartyInviteOutput || (CreatePartyInviteOutput = {}));
export var GetPartyFromInviteInput;
(function (GetPartyFromInviteInput) {
    GetPartyFromInviteInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetPartyFromInviteInput || (GetPartyFromInviteInput = {}));
export var PartyActivityIdle;
(function (PartyActivityIdle) {
    PartyActivityIdle.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(PartyActivityIdle || (PartyActivityIdle = {}));
export var GameHandle;
(function (GameHandle) {
    GameHandle.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GameHandle || (GameHandle = {}));
export var PartyActivityMatchmakerFindingLobby;
(function (PartyActivityMatchmakerFindingLobby) {
    PartyActivityMatchmakerFindingLobby.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(PartyActivityMatchmakerFindingLobby || (PartyActivityMatchmakerFindingLobby = {}));
export var PartyMatchmakerLobby;
(function (PartyMatchmakerLobby) {
    PartyMatchmakerLobby.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(PartyMatchmakerLobby || (PartyMatchmakerLobby = {}));
export var PartyActivityMatchmakerLobby;
(function (PartyActivityMatchmakerLobby) {
    PartyActivityMatchmakerLobby.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(PartyActivityMatchmakerLobby || (PartyActivityMatchmakerLobby = {}));
export var PartyActivity;
(function (PartyActivity) {
    PartyActivity.visit = function (value, visitor) {
        if (value.idle !== undefined)
            return visitor.idle(value.idle);
        if (value.matchmakerFindingLobby !== undefined)
            return visitor.matchmakerFindingLobby(value.matchmakerFindingLobby);
        if (value.matchmakerLobby !== undefined)
            return visitor.matchmakerLobby(value.matchmakerLobby);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
    PartyActivity.filterSensitiveLog = function (obj) {
        var _a;
        if (obj.idle !== undefined)
            return { idle: PartyActivityIdle.filterSensitiveLog(obj.idle)
            };
        if (obj.matchmakerFindingLobby !== undefined)
            return { matchmakerFindingLobby: PartyActivityMatchmakerFindingLobby.filterSensitiveLog(obj.matchmakerFindingLobby)
            };
        if (obj.matchmakerLobby !== undefined)
            return { matchmakerLobby: PartyActivityMatchmakerLobby.filterSensitiveLog(obj.matchmakerLobby)
            };
        if (obj.$unknown !== undefined)
            return _a = {}, _a[obj.$unknown[0]] = 'UNKNOWN', _a;
    };
})(PartyActivity || (PartyActivity = {}));
export var PartyExternalLinks;
(function (PartyExternalLinks) {
    PartyExternalLinks.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(PartyExternalLinks || (PartyExternalLinks = {}));
export var PartyInviteAlias;
(function (PartyInviteAlias) {
    PartyInviteAlias.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(PartyInviteAlias || (PartyInviteAlias = {}));
export var PartyInviteExternalLinks;
(function (PartyInviteExternalLinks) {
    PartyInviteExternalLinks.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(PartyInviteExternalLinks || (PartyInviteExternalLinks = {}));
export var PartyInvite;
(function (PartyInvite) {
    PartyInvite.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(PartyInvite || (PartyInvite = {}));
export var IdentityExternalLinks;
(function (IdentityExternalLinks) {
    IdentityExternalLinks.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(IdentityExternalLinks || (IdentityExternalLinks = {}));
export var IdentityGameActivity;
(function (IdentityGameActivity) {
    IdentityGameActivity.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(IdentityGameActivity || (IdentityGameActivity = {}));
export var PartyHandle;
(function (PartyHandle) {
    PartyHandle.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.activity && { activity: PartyActivity.filterSensitiveLog(obj.activity)
    }))); };
})(PartyHandle || (PartyHandle = {}));
export var IdentityStatus;
(function (IdentityStatus) {
    IdentityStatus["AWAY"] = "away";
    IdentityStatus["OFFLINE"] = "offline";
    IdentityStatus["ONLINE"] = "online";
})(IdentityStatus || (IdentityStatus = {}));
export var IdentityPresence;
(function (IdentityPresence) {
    IdentityPresence.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.party && { party: PartyHandle.filterSensitiveLog(obj.party)
    }))); };
})(IdentityPresence || (IdentityPresence = {}));
export var IdentityHandle;
(function (IdentityHandle) {
    IdentityHandle.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.presence && { presence: IdentityPresence.filterSensitiveLog(obj.presence)
    }))); };
})(IdentityHandle || (IdentityHandle = {}));
export var PartyMemberStateIdle;
(function (PartyMemberStateIdle) {
    PartyMemberStateIdle.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(PartyMemberStateIdle || (PartyMemberStateIdle = {}));
export var PartyMemberStateMatchmakerFindingLobby;
(function (PartyMemberStateMatchmakerFindingLobby) {
    PartyMemberStateMatchmakerFindingLobby.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(PartyMemberStateMatchmakerFindingLobby || (PartyMemberStateMatchmakerFindingLobby = {}));
export var PartyMemberStateMatchmakerLobby;
(function (PartyMemberStateMatchmakerLobby) {
    PartyMemberStateMatchmakerLobby.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(PartyMemberStateMatchmakerLobby || (PartyMemberStateMatchmakerLobby = {}));
export var PartyMemberStateMatchmakerPending;
(function (PartyMemberStateMatchmakerPending) {
    PartyMemberStateMatchmakerPending.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(PartyMemberStateMatchmakerPending || (PartyMemberStateMatchmakerPending = {}));
export var PartyMemberState;
(function (PartyMemberState) {
    PartyMemberState.visit = function (value, visitor) {
        if (value.idle !== undefined)
            return visitor.idle(value.idle);
        if (value.matchmakerPending !== undefined)
            return visitor.matchmakerPending(value.matchmakerPending);
        if (value.matchmakerFindingLobby !== undefined)
            return visitor.matchmakerFindingLobby(value.matchmakerFindingLobby);
        if (value.matchmakerLobby !== undefined)
            return visitor.matchmakerLobby(value.matchmakerLobby);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
    PartyMemberState.filterSensitiveLog = function (obj) {
        var _a;
        if (obj.idle !== undefined)
            return { idle: PartyMemberStateIdle.filterSensitiveLog(obj.idle)
            };
        if (obj.matchmakerPending !== undefined)
            return { matchmakerPending: PartyMemberStateMatchmakerPending.filterSensitiveLog(obj.matchmakerPending)
            };
        if (obj.matchmakerFindingLobby !== undefined)
            return { matchmakerFindingLobby: PartyMemberStateMatchmakerFindingLobby.filterSensitiveLog(obj.matchmakerFindingLobby)
            };
        if (obj.matchmakerLobby !== undefined)
            return { matchmakerLobby: PartyMemberStateMatchmakerLobby.filterSensitiveLog(obj.matchmakerLobby)
            };
        if (obj.$unknown !== undefined)
            return _a = {}, _a[obj.$unknown[0]] = 'UNKNOWN', _a;
    };
})(PartyMemberState || (PartyMemberState = {}));
export var PartyMemberSummary;
(function (PartyMemberSummary) {
    PartyMemberSummary.filterSensitiveLog = function (obj) { return (__assign(__assign(__assign({}, obj), (obj.identity && { identity: IdentityHandle.filterSensitiveLog(obj.identity)
    })), (obj.state && { state: PartyMemberState.filterSensitiveLog(obj.state)
    }))); };
})(PartyMemberSummary || (PartyMemberSummary = {}));
export var PartySummary;
(function (PartySummary) {
    PartySummary.filterSensitiveLog = function (obj) { return (__assign(__assign(__assign({}, obj), (obj.activity && { activity: PartyActivity.filterSensitiveLog(obj.activity)
    })), (obj.members && { members: obj.members.map(function (item) {
            return PartyMemberSummary.filterSensitiveLog(item);
        })
    }))); };
})(PartySummary || (PartySummary = {}));
export var GetPartyFromInviteOutput;
(function (GetPartyFromInviteOutput) {
    GetPartyFromInviteOutput.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.party && { party: PartySummary.filterSensitiveLog(obj.party)
    }))); };
})(GetPartyFromInviteOutput || (GetPartyFromInviteOutput = {}));
export var GetPartySelfSummaryInput;
(function (GetPartySelfSummaryInput) {
    GetPartySelfSummaryInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetPartySelfSummaryInput || (GetPartySelfSummaryInput = {}));
export var WatchResponse;
(function (WatchResponse) {
    WatchResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(WatchResponse || (WatchResponse = {}));
export var GetPartySelfSummaryOutput;
(function (GetPartySelfSummaryOutput) {
    GetPartySelfSummaryOutput.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.party && { party: PartySummary.filterSensitiveLog(obj.party)
    }))); };
})(GetPartySelfSummaryOutput || (GetPartySelfSummaryOutput = {}));
export var GetPartySummaryInput;
(function (GetPartySummaryInput) {
    GetPartySummaryInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetPartySummaryInput || (GetPartySummaryInput = {}));
export var GetPartySummaryOutput;
(function (GetPartySummaryOutput) {
    GetPartySummaryOutput.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.party && { party: PartySummary.filterSensitiveLog(obj.party)
    }))); };
})(GetPartySummaryOutput || (GetPartySummaryOutput = {}));
export var JoinPartyInvite;
(function (JoinPartyInvite) {
    JoinPartyInvite.visit = function (value, visitor) {
        if (value.token !== undefined)
            return visitor.token(value.token);
        if (value.alias !== undefined)
            return visitor.alias(value.alias);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
    JoinPartyInvite.filterSensitiveLog = function (obj) {
        var _a;
        if (obj.token !== undefined)
            return { token: obj.token
            };
        if (obj.alias !== undefined)
            return { alias: obj.alias
            };
        if (obj.$unknown !== undefined)
            return _a = {}, _a[obj.$unknown[0]] = 'UNKNOWN', _a;
    };
})(JoinPartyInvite || (JoinPartyInvite = {}));
export var JoinPartyInput;
(function (JoinPartyInput) {
    JoinPartyInput.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.invite && { invite: JoinPartyInvite.filterSensitiveLog(obj.invite)
    }))); };
})(JoinPartyInput || (JoinPartyInput = {}));
export var JoinPartyOutput;
(function (JoinPartyOutput) {
    JoinPartyOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(JoinPartyOutput || (JoinPartyOutput = {}));
export var KickMemberInput;
(function (KickMemberInput) {
    KickMemberInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(KickMemberInput || (KickMemberInput = {}));
export var KickMemberOutput;
(function (KickMemberOutput) {
    KickMemberOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(KickMemberOutput || (KickMemberOutput = {}));
export var LeavePartyInput;
(function (LeavePartyInput) {
    LeavePartyInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(LeavePartyInput || (LeavePartyInput = {}));
export var LeavePartyOutput;
(function (LeavePartyOutput) {
    LeavePartyOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(LeavePartyOutput || (LeavePartyOutput = {}));
export var RevokePartyInviteInput;
(function (RevokePartyInviteInput) {
    RevokePartyInviteInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(RevokePartyInviteInput || (RevokePartyInviteInput = {}));
export var RevokePartyInviteOutput;
(function (RevokePartyInviteOutput) {
    RevokePartyInviteOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(RevokePartyInviteOutput || (RevokePartyInviteOutput = {}));
export var SendInviteChatMessageInput;
(function (SendInviteChatMessageInput) {
    SendInviteChatMessageInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(SendInviteChatMessageInput || (SendInviteChatMessageInput = {}));
export var SendInviteChatMessageOutput;
(function (SendInviteChatMessageOutput) {
    SendInviteChatMessageOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(SendInviteChatMessageOutput || (SendInviteChatMessageOutput = {}));
export var TransferOwnershipInput;
(function (TransferOwnershipInput) {
    TransferOwnershipInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(TransferOwnershipInput || (TransferOwnershipInput = {}));
export var TransferOwnershipOutput;
(function (TransferOwnershipOutput) {
    TransferOwnershipOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(TransferOwnershipOutput || (TransferOwnershipOutput = {}));
export var SetActivityIdleInput;
(function (SetActivityIdleInput) {
    SetActivityIdleInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(SetActivityIdleInput || (SetActivityIdleInput = {}));
export var SetActivityIdleOutput;
(function (SetActivityIdleOutput) {
    SetActivityIdleOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(SetActivityIdleOutput || (SetActivityIdleOutput = {}));
export var FindMatchmakerLobbyInput;
(function (FindMatchmakerLobbyInput) {
    FindMatchmakerLobbyInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(FindMatchmakerLobbyInput || (FindMatchmakerLobbyInput = {}));
export var FindMatchmakerLobbyOutput;
(function (FindMatchmakerLobbyOutput) {
    FindMatchmakerLobbyOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(FindMatchmakerLobbyOutput || (FindMatchmakerLobbyOutput = {}));
export var JoinMatchmakerLobbyInput;
(function (JoinMatchmakerLobbyInput) {
    JoinMatchmakerLobbyInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(JoinMatchmakerLobbyInput || (JoinMatchmakerLobbyInput = {}));
export var JoinMatchmakerLobbyOutput;
(function (JoinMatchmakerLobbyOutput) {
    JoinMatchmakerLobbyOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(JoinMatchmakerLobbyOutput || (JoinMatchmakerLobbyOutput = {}));
export var RequestMatchmakerPlayerInput;
(function (RequestMatchmakerPlayerInput) {
    RequestMatchmakerPlayerInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(RequestMatchmakerPlayerInput || (RequestMatchmakerPlayerInput = {}));
export var RequestMatchmakerPlayerOutput;
(function (RequestMatchmakerPlayerOutput) {
    RequestMatchmakerPlayerOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(RequestMatchmakerPlayerOutput || (RequestMatchmakerPlayerOutput = {}));
var BadRequestError = (function (_super) {
    __extends(BadRequestError, _super);
    function BadRequestError(opts) {
        var _this = _super.call(this, __assign({ name: "BadRequestError", $fault: "client" }, opts)) || this;
        _this.name = "BadRequestError";
        _this.$fault = "client";
        Object.setPrototypeOf(_this, BadRequestError.prototype);
        _this.code = opts.code;
        _this.metadata = opts.metadata;
        return _this;
    }
    return BadRequestError;
}(__BaseException));
export { BadRequestError };
var ForbiddenError = (function (_super) {
    __extends(ForbiddenError, _super);
    function ForbiddenError(opts) {
        var _this = _super.call(this, __assign({ name: "ForbiddenError", $fault: "client" }, opts)) || this;
        _this.name = "ForbiddenError";
        _this.$fault = "client";
        Object.setPrototypeOf(_this, ForbiddenError.prototype);
        _this.code = opts.code;
        _this.metadata = opts.metadata;
        return _this;
    }
    return ForbiddenError;
}(__BaseException));
export { ForbiddenError };
var InternalError = (function (_super) {
    __extends(InternalError, _super);
    function InternalError(opts) {
        var _this = _super.call(this, __assign({ name: "InternalError", $fault: "server" }, opts)) || this;
        _this.name = "InternalError";
        _this.$fault = "server";
        _this.$retryable = {};
        Object.setPrototypeOf(_this, InternalError.prototype);
        _this.code = opts.code;
        _this.metadata = opts.metadata;
        return _this;
    }
    return InternalError;
}(__BaseException));
export { InternalError };
var NotFoundError = (function (_super) {
    __extends(NotFoundError, _super);
    function NotFoundError(opts) {
        var _this = _super.call(this, __assign({ name: "NotFoundError", $fault: "client" }, opts)) || this;
        _this.name = "NotFoundError";
        _this.$fault = "client";
        Object.setPrototypeOf(_this, NotFoundError.prototype);
        _this.code = opts.code;
        _this.metadata = opts.metadata;
        return _this;
    }
    return NotFoundError;
}(__BaseException));
export { NotFoundError };
var RateLimitError = (function (_super) {
    __extends(RateLimitError, _super);
    function RateLimitError(opts) {
        var _this = _super.call(this, __assign({ name: "RateLimitError", $fault: "client" }, opts)) || this;
        _this.name = "RateLimitError";
        _this.$fault = "client";
        Object.setPrototypeOf(_this, RateLimitError.prototype);
        _this.code = opts.code;
        _this.metadata = opts.metadata;
        return _this;
    }
    return RateLimitError;
}(__BaseException));
export { RateLimitError };
var UnauthorizedError = (function (_super) {
    __extends(UnauthorizedError, _super);
    function UnauthorizedError(opts) {
        var _this = _super.call(this, __assign({ name: "UnauthorizedError", $fault: "client" }, opts)) || this;
        _this.name = "UnauthorizedError";
        _this.$fault = "client";
        _this.$retryable = {};
        Object.setPrototypeOf(_this, UnauthorizedError.prototype);
        _this.code = opts.code;
        _this.metadata = opts.metadata;
        return _this;
    }
    return UnauthorizedError;
}(__BaseException));
export { UnauthorizedError };
