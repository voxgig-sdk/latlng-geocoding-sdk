<?php
declare(strict_types=1);

// LatlngGeocoding SDK base feature

class LatlngGeocodingBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(LatlngGeocodingContext $ctx, array $options): void {}
    public function PostConstruct(LatlngGeocodingContext $ctx): void {}
    public function PostConstructEntity(LatlngGeocodingContext $ctx): void {}
    public function SetData(LatlngGeocodingContext $ctx): void {}
    public function GetData(LatlngGeocodingContext $ctx): void {}
    public function GetMatch(LatlngGeocodingContext $ctx): void {}
    public function SetMatch(LatlngGeocodingContext $ctx): void {}
    public function PrePoint(LatlngGeocodingContext $ctx): void {}
    public function PreSpec(LatlngGeocodingContext $ctx): void {}
    public function PreRequest(LatlngGeocodingContext $ctx): void {}
    public function PreResponse(LatlngGeocodingContext $ctx): void {}
    public function PreResult(LatlngGeocodingContext $ctx): void {}
    public function PreDone(LatlngGeocodingContext $ctx): void {}
    public function PreUnexpected(LatlngGeocodingContext $ctx): void {}
}
